import { authSap, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { authCognito, createOrder, submitOrder } from '../../../../services/operations.service';



export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 5%
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
  },
  stages: [
    { duration: '4s', target: 2 },
    { duration: '10', target: 2 },
    { duration: '4s', target: 4 },
    { duration: '10s', target: 4 },
    { duration: '4s', target: 8 },
    { duration: '10s', target: 8 },
    { duration: '4s', target: 16 },
    { duration: '10s', target: 16 },
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