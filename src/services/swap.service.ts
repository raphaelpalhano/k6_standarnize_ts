import http from "k6/http";
import { setupEnv } from "../envs/env.control";
import { check, sleep } from "k6";

const ENV = setupEnv(__ENV.ENVIRONMENT ?? 'NONPROD');


export default function getSwapi(endpoint: string) {
  const response = http.get(`${ENV.API_URL}${endpoint}`, {headers: {Accepts: "application/json"}});
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};