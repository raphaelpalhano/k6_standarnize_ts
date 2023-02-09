import { authSap, uploadInvoices } from "../../../services/sap.service";
import { group } from 'k6';



export function setup() {
  return {token:  authSap('manager')};
}


export default function (data) {

  group('[Sponsors] upload 100 notas', function () {
    uploadInvoices(1, data.token)
  });

}

export function teardown(data){
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data)}`);
  } 
}
