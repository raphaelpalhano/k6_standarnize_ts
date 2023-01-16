import http from 'k6/http';
import { check } from 'k6';
import { USERNAME_GESTOR, USERNAME_INVESTOR, USERNAME_SUPPLIER, PASSWORD_ENTITY } from '../constants/users.js';
import { createInvoices } from '../helper/json.control.js';
import { SAP_URL } from '../constants/urls.js';



export function authSap(entityType) {
  let typeUser;
  const typesUsers = {
    supplier: {
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
      client_secret: 'onmsvsv7nq70g51lpnnsab4mj270ajmu7ere1qcks988ttq610k'
   
    },
  };  
  
  typeUser = typesUsers[entityType]
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/x-www-form-urlencoded' 
    }, 
  };

  const payload = `username=${typeUser.username}&password=${typeUser.password}&client_id=${typeUser.client_id}&client_secret=${typeUser.client_secret}`
  const response = http.post(`${SAP_URL}auth/token`, payload, params)

  // check(response, { 'status is 200': (r) => r.status === 200 });

  // sleep(0.3);

  return response.json().AccessToken
}

export function uploadInvoices(numberInvoices){
  const payload = createInvoices(numberInvoices);
  const token = authSap('manager');
  const params = {
    headers: 
    { 
      'Accept': '*/*',
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
  };

  const response = http.post(`${SAP_URL}sponsors/1/payables`, payload, params)

  console.log(response);
  check(response, { 'status is 202': (r) => r.status === 202 });

  sleep(0.3);

}

