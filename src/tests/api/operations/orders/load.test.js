import { authSap, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { authCognito, createOrder, submitOrder } from '../../../../services/operations.service';
import { ENV_TEST } from "../../../../helper/env.test.control";



export const options = {
  thresholds: {
    http_req_failed: ENV_TEST.FAIL_REQUESTS || ['rate<0.02'], // http errors should be less than 5%
    http_req_duration: ENV_TEST.THRESHOLD || ['p(95)<300'], // 95% of requests should be below 200ms
  },
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: ENV_TEST.DURATION_START || '10s', target: ENV_TEST.VU_START || 10 },

    // Stay at rest on 5 VUs for 10s
    { duration: ENV_TEST.DURATION_MIDDLE || '2m', target:  ENV_TEST.VU_MIDDLE || 10 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: ENV_TEST.DURATION_FINAL || '5s', target: ENV_TEST.VU_FINAL || 0 },
  ],
};

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