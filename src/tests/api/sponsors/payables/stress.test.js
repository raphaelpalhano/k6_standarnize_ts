import { authSap, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { ENV_TEST } from "../../../../helper/env.test.control";


export const options = {
  thresholds: {
    http_req_failed: [ENV_TEST.FAIL_REQUESTS] || ['rate<0.02'], // http errors should be less than 5%
    http_req_duration: [ENV_TEST.THRESHOLD] || ['p(95)<900'], // 95% of requests should be below 200ms
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
  return {token:  authSap('integrator')};
}


export default function (data) {

  group('[Sponsors] upload 100 notas', function () {
    uploadInvoices( ENV_TEST.INVOICES || 100, data.token)
  });

}

export function teardown(data){
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data)}`);
  } 
}