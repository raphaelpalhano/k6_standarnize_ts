import { authSap, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { authCognito, createOrder, submitOrder } from '../../../../services/operations.service';
import { ENV_TEST } from "../../../../helper/env.test.control";



export const options = {
  thresholds: {
    http_req_failed: [ENV_TEST.FAIL_REQUESTS || 'rate<0.02'], // http errors should be less than 5%
    http_req_duration: [ENV_TEST.THRESHOLD || 'p(95)<300'], // 95% of requests should be below 200ms
  },
  stages: [
    { duration: ENV_TEST.DURATION_START || '10s', target: ENV_TEST.VU_START || 2 }, // below normal load
    { duration: ENV_TEST.DURATION_MIDDLE || '20s', target: ENV_TEST.VU_MIDDLE **2 || 4 },
    { duration: ENV_TEST.DURATION_START || '10s', target: ENV_TEST.VU_MIDDLE ** 3 || 8 }, // below normal load
    { duration: ENV_TEST.DURATION_MIDDLE || '20s', target: ENV_TEST.VU_MIDDLE ** 3 || 8 },
    { duration: ENV_TEST.DURATION_START || '10s', target: ENV_TEST.VU_MIDDLE ** 4 || 16 },
    { duration: ENV_TEST.DURATION_MIDDLE || '20s', target: ENV_TEST.VU_MIDDLE **4 || 16 },
    { duration: ENV_TEST.DURATION_MIDDLE || '10s', target: ENV_TEST.VU_MIDDLE **5 || 32 },
    { duration: ENV_TEST.DURATION_MIDDLE || '20s', target: ENV_TEST.VU_MIDDLE **5 || 32 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
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