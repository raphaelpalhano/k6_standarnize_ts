import { uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';
export const options = {
  stages: [
    { duration: '2s', target: 2 }, // below normal load
    { duration: '5s', target: 2 },
    { duration: '2s', target: 4 }, // normal load
    { duration: '5s', target: 4 },
    { duration: '2s', target: 6 }, // around the breaking point
    { duration: '5s', target: 6 },
    { duration: '2s', target: 8 }, // beyond the breaking point
    { duration: '5s', target: 8 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  group('METHOD=POST,API=sap,ENDPOINT=sponsors', function () {
    uploadInvoices(5)
  });
}
