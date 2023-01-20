import http from 'k6/http';
import { check, sleep } from 'k6';
<<<<<<< HEAD
import { createInvoices } from '../helper/json.control.js';
import { setupEnv } from '../helper/env.control.js';

const ENV = setupEnv(__ENV.VARIABLES_ENV); 
// let TOKEN = ''
=======
import { USERNAME_GESTOR, USERNAME_INVESTOR, USERNAME_SUPPLIER, PASSWORD_ENTITY } from '../constants/users.js';
import { createInvoices } from '../helper/json.control.js';
import { SAP_URL } from '../constants/urls.js';


>>>>>>> 02cc7eaff24ddbf7ea76e1dfd5b139896b64b818

export function authSap(entityType) {
  let typeUser;
  const typesUsers = {
    supplier: {
<<<<<<< HEAD
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
=======
      username: USERNAME_SUPPLIER,
      password: PASSWORD_ENTITY,
      client_id: '454138p4irfg7gjd428af7pqkf',
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
    },
    manager: {
      username: USERNAME_GESTOR,
      password: PASSWORD_ENTITY,
      client_id: '454138p4irfg7gjd428af7pqkf',
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
    },
    investor: {
      username: USERNAME_INVESTOR,
      password: PASSWORD_ENTITY,
      client_id: '454138p4irfg7gjd428af7pqkf',
>>>>>>> 02cc7eaff24ddbf7ea76e1dfd5b139896b64b818
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
   
    },
  };  
  
<<<<<<< HEAD
  typeUser = typesUsers[entityType];
=======
  typeUser = typesUsers[entityType]
>>>>>>> 02cc7eaff24ddbf7ea76e1dfd5b139896b64b818
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/x-www-form-urlencoded' 
    }, 
  };

  const payload = `username=${typeUser.username}&password=${typeUser.password}&client_id=${typeUser.client_id}&client_secret=${typeUser.client_secret}`
<<<<<<< HEAD
  const response = http.post(`${ENV.SAP_URL}auth/token`, payload, params) 

  if(response.status !== 200){
    console.log(response)
    console.log(response.status);
  }
=======
  const response = http.post(`${SAP_URL}auth/token`, payload, params)
>>>>>>> 02cc7eaff24ddbf7ea76e1dfd5b139896b64b818

  check(response, { 'status is 200': (r) => r.status === 200 });

  sleep(0.1);


<<<<<<< HEAD
  return response.json().access_token
}

export function uploadInvoices(numberInvoices){
  // if(TOKEN.length < 1){
    
  // }

  const TOKEN = authSap('manager');
 
  const payload = createInvoices(numberInvoices);
=======
  return response.json().AccessToken
}

export function uploadInvoices(numberInvoices){
  const payload = createInvoices(numberInvoices);
  const token = authSap('manager');
>>>>>>> 02cc7eaff24ddbf7ea76e1dfd5b139896b64b818
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/json',
<<<<<<< HEAD
      'Authorization': `Bearer ${TOKEN}`
    }, 
  };

  const response = http.post(`${ENV.SAP_URL}sponsors/1/payables`, payload, params)
  if(response.status !== 202){
    console.log(response)
    console.log(response.status);
  }

  check(response, { 'status is 202': (r) => r.status === 202 });


=======
      'Authorization': `Bearer ${token}`
    }, 
  };

  const response = http.post(`${SAP_URL}sponsors/1/payables`, payload, params)
  console.log(response.status)
  check(response, { 'status is 202': (r) => r.status === 202 });

>>>>>>> 02cc7eaff24ddbf7ea76e1dfd5b139896b64b818
  sleep(0.3);

}

