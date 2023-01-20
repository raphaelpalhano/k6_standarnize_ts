import http from 'k6/http';
import { check, sleep } from 'k6';
import { setupEnv } from './env.control.js';


let TOKEN;
const ENV = setupEnv(__ENV.VARIABLES_ENV); 


export function authCognito(entityType){
    if(TOKEN){
        return TOKEN;
    }
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
    };

    typeUser = typesUsers[entityType]
    const params = {
        headers: 
        { 
            'Accept': '*/*',
            'authority': 'cognito-idp.us-east-1.amazonaws.com', 
            'content-type': 'application/x-amz-json-1.1',
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'cross-site', 
            'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth', 
            'x-amz-user-agent': 'aws-amplify/5.0.4 js' 
        }, 
    };

    const body = {
        "AuthFlow": "USER_PASSWORD_AUTH",
        "ClientId": `${ENV.COGNITO_CLIENT}`,
        "AuthParameters": {
            "USERNAME": typeUser.username,
            "PASSWORD": typeUser.password
        },
        "ClientMetadata": {}
    }

    const response = http.post(`${ENV.COGNITO_URL}`, body, params)
    TOKEN = response.json().AccessToken


    check(response, { 'status is 200': (r) => r.status === 200 });

    sleep(0.1);
    
    return response.json().AccessToken

}

