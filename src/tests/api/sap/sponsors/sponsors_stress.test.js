import { uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
export const options = {
  stages: [
    { duration: '4s', target: 6 }, // below normal load
    { duration: '10s', target: 6 },
    { duration: '4s', target: 12 }, // normal load
    { duration: '10s', target: 12 },
    { duration: '4s', target: 24 }, // around the breaking point
    { duration: '10s', target: 24 },
    { duration: '4s', target: 48 }, // beyond the breaking point
    { duration: '10s', target: 48 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  group('METHOD=POST,API=sap,ENDPOINT=sponsors', function () {
    uploadInvoices(5)
  });
}
