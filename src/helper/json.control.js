// import { SharedArray } from 'k6/data';
import { dataIncrement, dataDecrease } from './date.control.js';
import {getRandomArbitrary} from './random.control.js';
import exec from 'k6/execution';


export function createInvoices(sizeObject, object){

    const dateIncremented = dataIncrement(10);
    const dateDecresed = dataDecrease(10)
    
    const iterationCompleted = (numberInvoices * exec.scenario.iterationInInstance);

    for(let step = 0; step < numberInvoices; step++){
        let iterationCount = iterationCompleted + step;
       
        if(!items.items.includes(object)){
            items.items.push(object);
            if(items.items.length > 99){
                console.log(`Upload de ${iterationCompleted} notas fiscais`);

            }
        
        }
        
    }



    return JSON.stringify(items)
        
}


