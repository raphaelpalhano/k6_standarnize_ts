import { Options } from "k6/options";
import { ENV_TEST } from "../envs/env.test.control";


export function optionsLoad(durationStart: string, durationMiddle: string, durationFinal: string, vuStart: number, 
  vuMiddle: number, req_fail = 'rate<0.05', req_duration = 'p(95)<800'): Options {
    const options = {
        thresholds: {
            http_req_failed: [ENV_TEST.FAIL_REQUESTS || req_fail], // http errors should be less than 5%
            http_req_duration: [ENV_TEST.THRESHOLD || req_duration], // 95% of requests should be below 200ms
          },
          stages: [
            // Ramp-up from 1 to 5 virtual users (VUs) in 5s
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_START || vuStart },
        
            // Stay at rest on 5 VUs for 10s
            { duration: ENV_TEST.DURATION_MIDDLE || durationMiddle, target:  ENV_TEST.VU_MIDDLE || vuMiddle },
        
            // Ramp-down from 5 to 0 VUs for 5s
            { duration: ENV_TEST.DURATION_FINAL || durationFinal, target: ENV_TEST.VU_FINAL || 0 },
          ],
    }

    return options;
}
