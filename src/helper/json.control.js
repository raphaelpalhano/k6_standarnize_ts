// import { SharedArray } from 'k6/data';
import { dataIncrement, dataDecrease } from './date.control.js';
import {getRandomArbitrary, getRandomInt} from './random.control.js';


export function createInvoices(numberInvoices){
    const dateIncremented = dataIncrement(5);
    const dateDecresed = dataDecrease(10)
    const items = {items: []};
    
    if(numberInvoices > 100 || numberInvoices <= 0) throw new Error("Numero de invoices incorreto!");
    for(let step = 0; step < numberInvoices; step++){
        let installmentValue = getRandomArbitrary(1, 1000);
        let object =  {
            assetType: 'DIREITOS_CREDITORIOS',
            externalId: getRandomInt(10000000),
            installment: installmentValue,
            invoiceDate: `${dateDecresed}`,
            invoiceKey: 'CC',
            invoiceNumber: getRandomArbitrary(1, 20000),
            paymentDate: `${dateIncremented}`,
            realPaymentDate: `${dateIncremented}`,
            paymentValue: getRandomArbitrary(1, 20000),
            supplierGovernmentId: '79922720000164',
            supplierName: 'PERFORMANCE TEST',
            totalInstallment: installmentValue,
        };
        items.items.push(object);
        
    }
    console.log(items)

    return JSON.stringify(items)
        
}

console.log(createInvoices(10));

// const data = new SharedArray('some data name', function (filePath) {
//   return JSON.parse(open(filePath));
// });

