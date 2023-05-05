import { ENV_TEST } from "../envs/env.test.control";


export function optionsLoad(durationStart, DurationMiddle, DurationFinal, vuStart, 
  VuMiddle, req_fail = 'rate<0.05', req_duration = 'p(95)<800'){
    const options = {
        thresholds: {
            http_req_failed: [ENV_TEST.FAIL_REQUESTS || req_fail], // http errors should be less than 5%
            http_req_duration: [ENV_TEST.THRESHOLD || req_duration], // 95% of requests should be below 200ms
          },
          stages: [
            // Ramp-up from 1 to 5 virtual users (VUs) in 5s
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_START || vuStart },
        
            // Stay at rest on 5 VUs for 10s
            { duration: ENV_TEST.DURATION_MIDDLE || DurationMiddle, target:  ENV_TEST.VU_MIDDLE || VuMiddle },
        
            // Ramp-down from 5 to 0 VUs for 5s
            { duration: ENV_TEST.DURATION_FINAL || DurationFinal, target: ENV_TEST.VU_FINAL || 0 },
          ],
    }

    return options;
}
