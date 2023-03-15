// import { SharedArray } from 'k6/data';
import { dataIncrement, dataDecrease } from './date.control.js';
import {getRandomArbitrary, getRandomInt} from './random.control.js';
import exec from 'k6/execution';


export function createInvoices(numberInvoices){
    if(numberInvoices > 100 || numberInvoices <= 0) throw new Error("Numero de invoices incorreto!");

    const dateIncremented = dataIncrement(10);
    const dateDecresed = dataDecrease(10)
    const items = {items: []}; 
    const iterationCompleted = (numberInvoices * exec.scenario.iterationInInstance);

    for(let step = 0; step < numberInvoices; step++){
        let installmentValue = getRandomArbitrary(1, 10000000);
        let iterationCount = iterationCompleted + step;
        let object =  {
            assetType: 'DIREITOS_CREDITORIOS',
            externalId: getRandomArbitrary(10000, 100000000000).toString(),
            installment: installmentValue,
            invoiceDate: `${dateDecresed}`,
            invoiceKey: `NOTA${iterationCount}`,
            invoiceNumber: `${iterationCount}`,
            paymentDate: `${dateIncremented}`,
            realPaymentDate: `${dateIncremented}`,
            paymentValue: getRandomArbitrary(100, 3000),
            supplierGovernmentId: '79922720000164',
            supplierName: `FERRAMENTARIA JN LTDA`,
            totalInstallment: installmentValue,
        };
        if(!items.items.includes(object)){
            items.items.push(object);
            if(items.items.length > 99){
                console.log(`Upload de ${iterationCompleted} notas fiscais`);

            }
        
        }
        
    }



    return JSON.stringify(items)
        
}


