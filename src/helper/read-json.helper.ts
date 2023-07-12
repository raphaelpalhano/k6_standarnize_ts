import { sleep } from 'k6';
import { SharedArray } from 'k6/data';


export default function (path: string, isList = false) {
  let datas: [] | object[];
  let data: object;

  if(isList){
    datas = new SharedArray('data', () => {
      const readData = JSON.parse(open(path));
      return readData;
    });
  }

  datas = JSON.parse(open(path));

  data = datas[__VU - 1];

  sleep(0.1);


  return data;
}
