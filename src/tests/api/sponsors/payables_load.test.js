import { authSap, uploadInvoices } from "../../../services/sap.service";
import { group } from 'k6';

/**
 
1. Validar os valores do payload, chaves preenchidas, como os campos obrigatórios.
2. Validação da nota (condições: valor inferior a 10, data de pagamento inferior a 5 dias, validar se não a nota duplicada, considera a chave composta )
OBS: CHAVE COMPOSTA: invoiceNumber, paymentDate, SupplierGovernmentId, e caso os campos adicionais installment e external estiverem presentes vão entrar na chave composta.
3. Inicializa o SQS e insere o Payload
4. Recebe as notas do SQS
5. É feito a verificação de duplicidade das notas, se as notas não estão no dynamoDb.
6. As notas que estão vindo do SQS se estiverem no DynamoDb, é gerado um log 
7. Iniciar outra fila payables_ready

 */ 

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 5%
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
  },
  stages: [
    // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: '10s', target: 10 },

    // Stay at rest on 5 VUs for 10s
    { duration: '2m33s', target: 10 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: '5s', target: 0 },
  ],
};

export function setup() {
  return {token:  authSap('manager')};
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