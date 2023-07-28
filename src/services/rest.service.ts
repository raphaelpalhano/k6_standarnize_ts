import http from "k6/http";
import { setupEnv } from "../envs/env.control";

const ENV = setupEnv(__ENV.ENVIRONMENT ?? 'NONPROD');


export function getHttp(endpoint: string, headers: object) {
  const request = http.request('GET', `${ENV.API_URL}/${endpoint}`, '', headers);

  return request;
}

export function postHttp(endpoint: string, headers: object) {
  const request = http.request('GET', `${ENV.API_URL}/${endpoint}`, '', headers);

  return request;
}