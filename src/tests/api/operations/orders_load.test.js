import { authSap, uploadInvoices } from "../../../services/sap.service";
import { group } from 'k6';
import { authCognito, createOrder, submitOrder } from '../../../services/operations.service';



export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 5%
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
  },
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: '10s', target: 10 },

    // Stay at rest on 5 VUs for 10s
    { duration: '2m', target: 10 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: '5s', target: 0 },
  ],
};

export function setup() {
   return {data:  {token_cognito: authCognito('supplier'), token_sap: authSap('manager')}};
}

export default function (data) {
  group('[Operations] create and submit operation', function () {
    uploadInvoices(10, data.data.token_sap)
    createOrder(data.data.token_cognito);
    submitOrder(data.data.token_cognito, '1')


  });



}


export function teardown(data){
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data)}`);
  } 
}