import { authSap, researchInvoices, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { optionsLoad } from "../../../../options/options.load";
import { ENV_TEST } from "../../../../envs/env.test.control";


export const options = optionsLoad('10s', '1m', '5s', 5, 10);

export function setup() {
  return {token:  authSap('integrator')};
}


export default function (data) {

  group(`[Sponsors] upload ${ENV_TEST.INVOICES || 2} notas`, function () {
    uploadInvoices(ENV_TEST.INVOICES || 2, data.token)
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