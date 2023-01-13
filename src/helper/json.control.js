import { SharedArray } from 'k6/data';
import { dataIncrement, dataDecrease } from './date.control.js';

export function createInvoices(numberInvoices){
    const dateIncremented = dataIncrement(5);
    const dateDecresed = dataDecrease(10)
    const object = {
        assetType: 'DIREITOS_CREDITORIOS',
        externalId: '',
        installment: 0,
        invoiceDate: `${dateDecresed}`,
        invoiceKey: 'CC',
        invoiceNumber: '',
        paymentDate: `${dateIncremented}`,
        realPaymentDate: `${dateIncremented}`,
        paymentValue: 0,
        supplierGovernmentId: '',
        supplierName: 'PERFORMANCE TEST',
        totalInstallment: 0,
    };
    try{
        if(numberInvoices > 100 || numberInvoices <= 0) throw new Error("Numero de invoices maior que o permitido!");
        
        
    }catch(e){
        console.log(`ERROR: ${e}`)
    }
}

const data = new SharedArray('some data name', function (filePath) {
  return JSON.parse(open(filePath));
});

