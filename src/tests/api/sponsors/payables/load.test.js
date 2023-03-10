import { authSap, researchInvoices, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { ENV_TEST } from "../../../../helper/env.test.control";


export const options = {
  thresholds: {
    http_req_failed: [`${ENV_TEST.FAIL_REQUESTS}`] || ['rate<0.02'], // http errors should be less than 5%
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
  return {token:  authSap('integrator')};
}


export default function (data) {

  group('[Sponsors] upload 100 notas', function () {
    uploadInvoices(ENV_TEST.INVOICES || 100, data.token)
  });

  group('[Sponsors] research for invoices', function () {
    researchInvoices({search: '', size: '', sort: ''}, data.token)
  });

}

export function teardown(data){
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data)}`);
  } 
}