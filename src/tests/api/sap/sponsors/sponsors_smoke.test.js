import { uploadInvoices } from "../../../../services/sap.service";
import { group } from 'k6';


export default function () {
  group('METHOD=POST,API=sap,ENDPOINT=sponsors', function () {
    uploadInvoices(5)
  });

}
