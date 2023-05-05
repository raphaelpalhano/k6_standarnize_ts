import { authSap, uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
import { ENV_TEST } from "../../../../envs/env.test.control";
import { optionsStress } from "../../../../options/options.stress";


export const options = optionsStress('10s', '20s', '5s', 2, 2);

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