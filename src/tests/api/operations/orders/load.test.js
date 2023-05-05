import { authSap, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { authCognito, createOrder, submitOrder } from '../../../../services/operations.service';
import { ENV_TEST } from "../../../../envs/env.test.control";



export const options = optionsLoad('10s', '1m', '5s', 5, 10);


export function setup() {
   return {data:  {token_cognito: authCognito('supplier'), token_sap: authSap('integrator')}};
}

export default function (data) {
  group('[Operations] create and submit operation', function () {
    uploadInvoices(ENV_TEST.INVOICES || 20, data.data.token_sap)
    createOrder(data.data.token_cognito);
    submitOrder(data.data.token_cognito, '1')


  });



}


export function teardown(data){
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data)}`);
  } 
}