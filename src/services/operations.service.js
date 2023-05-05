import http from 'k6/http';
import { check, sleep } from 'k6';
import { setupEnv } from '../envs/env.control';


const ENV = setupEnv(__ENV.VARIABLES_ENV || "NONPROD");



export function authCognito(entityType) {
    let typeUser;
    const typesUsers = {
        supplier: {
        username: ENV.USER_BACK_SUPPLIER,
        password: ENV.PASSWORD_ENTITY,
        
        },
        manager: {
        username: ENV.USER_BACK_MANAGER,
        password: ENV.PASSWORD_ENTITY,
        
        },
        investor: {
        username: ENV.USER_BACK_INVESTOR,
        password: ENV.PASSWORD_ENTITY,
    
        },
        integrator:{
            username: ENV.USER_INTEGRATOR,
            password: ENV.PASSOWRD_INTEGRATOR
        },

        client_id: ENV.COGNITO_CLIENT,
    };  
    
    typeUser = typesUsers[entityType];

    const params = {
        auth: 'basic',
        headers: 
        { 
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
        'content-type': 'application/x-amz-json-1.1',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        'x-amz-user-agent': 'aws-amplify/5.0.4 js'
        }, 
    };

    const payload = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: typesUsers.client_id,
            AuthParameters: { USERNAME: typeUser.username, PASSWORD: typeUser.password },
            ClientMetadata: {},
    };
    const response = http.post(`${ENV.COGNITO_URL}`,  JSON.stringify(payload), params) 

    if(response.status !== 200){
        console.log(response);
        console.log(`fail: status ${response.status}`)
    }

    check(response, { 'status is 200': (r) => r.status === 200 });

    sleep(0.1);


    return response.json().AuthenticationResult.AccessToken;
}




export function createOrder(TOKEN){

    const payload = {
        "document": "79922720000164"
    }

    const params = {
        headers: 
        { 
            'Accept': '*/*',
            'content-type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }, 
    };
    const response = http.post(`${ENV.API_URL}operations/api/v1/orders`, JSON.stringify(payload), params)
    if(response.status !== 202){
        console.log(`fail: status ${response.status}`)
    }
    check(response, { 'status is 201': (r) => r.status === 201 });
    
    sleep(2);

}

export function submitOrder(TOKEN, id){

    const payload = {
        "bankAccountId": "1"
    }

    const params = {
        headers: 
            { 
                'Accept': '*/*',
                'content-type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }, 
    };
  
    const response = http.post(`${ENV.API_URL}operations/api/v1/orders/${id}/submit`, JSON.stringify(payload), params)
    if(response.status !== 202){
        console.log(`fail: status ${response.status}`)
    }
    check(response, { 'status is 201': (r) => r.status === 201 });
    
    sleep(0.3);

}