import http from 'k6/http';
import { check, sleep } from 'k6';
import { createInvoices } from '../helper/json.control.js';
import { setupEnv } from '../helper/env.control.js';

const ENV = setupEnv(__ENV.VARIABLES_ENV); 

export function authSap(entityType) {

  let typeUser;
  const typesUsers = {
    supplier: {
      username: ENV.USER_BACK_SUPPLIER,
      password: ENV.PASSWORD_ENTITY,
      client_id: ENV.COGNITO_CLIENT_SAP,
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
    },
    manager: {
      username: ENV.USER_BACK_MANAGER,
      password: ENV.PASSWORD_ENTITY,
      client_id: ENV.COGNITO_CLIENT_SAP,
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
    },
    investor: {
      username: ENV.USER_BACK_INVESTOR,
      password: ENV.PASSWORD_ENTITY,
      client_id: ENV.COGNITO_CLIENT_SAP,
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
   
    },
  };  
  
  typeUser = typesUsers[entityType];
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/x-www-form-urlencoded' 
    }, 
  };

  const payload = `username=${typeUser.username}&password=${typeUser.password}&client_id=${typeUser.client_id}&client_secret=${typeUser.client_secret}`
  const response = http.post(`${ENV.SAP_URL}auth/token`, payload, params) 

  if(response.status !== 200){
    console.log(response)
    console.log(response.status);
  }



  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.1);


  return response.json().access_token
}

export function uploadInvoices(numberInvoices, TOKEN){

  const payload = createInvoices(numberInvoices);
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    }, 
  };

  const response = http.post(`${ENV.SAP_URL}sponsors/1/payables`, payload, params)
  if(response.status !== 202){
     console.log(JSON.stringify(response, null, "  "));
      console.log(response.status);
  }

  check(response, { 'status is 202': (r) => r.status === 202 });


  sleep(0.3);

}

export function researchInvoices(filter, TOKEN){
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    }, 
  };
  
  const response = http.get(`${ENV.SAP_URL}sponsors/1/payables?search${filter.search}&size=${filter.size}&sort=${filter.sort}`, params);

  if(response.status !== 200){
    console.log(JSON.stringify(response, null, "  "));
    console.log(response.status);
  }

  check(response, { 'status is 202': (r) => r.status === 202 });


  sleep(0.2);

}