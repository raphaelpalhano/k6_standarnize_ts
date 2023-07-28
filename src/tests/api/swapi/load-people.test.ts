import { group } from 'k6';
import { optionsLoad } from '../../../options/options.load';
import getSwapi from '../../../services/swap.service';

//options
export const options = optionsLoad('10s', '1m', '5s', 50, 100);

//setup (generate token)
export function setup() {
  return {token: 'TOKEN'};
}

//execute test
export default function () {

  group(`[Method: GET, path: /peoples/:id]`, function () {
    getSwapi('/people/30/')
  });
}


//terdown token and finish test
export function teardown(data: any): void{
  if(!data){
    throw new Error(`token not generate ${JSON.stringify(data.token)}`);
  } 
}