import { authSap, uploadInvoices } from "../../../services/sap.service";
import { group } from 'k6';


export const options = {
  stages: [
    { duration: '4s', target: 2 }, // below normal load
    { duration: '10s', target: 4 },
    { duration: '4s', target: 8 }, // normal load
    { duration: '10s', target: 16 },
    { duration: '4s', target: 20 }, // around the breaking point
    { duration: '10s', target: 20 },
    { duration: '4s', target: 40 }, // beyond the breaking point
    { duration: '10s', target: 40 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export function setup() {
  return {token:  authSap('integrator')};
}


export default function (data) {

  group('[Sponsors] upload 100 notas', function () {
    uploadInvoices(100, data.token)
  });

}

export function teardown(data){
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data)}`);
  } 
}