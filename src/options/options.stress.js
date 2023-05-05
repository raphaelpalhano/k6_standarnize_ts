import { ENV_TEST } from "../envs/env.test.control";

export function optionsStress(durationStart, DurationMiddle, DurationFinal, vuStart, 
  VuMiddle, req_fail = 'rate<0.05', req_duration = 'p(95)<800'){
    const options = {
        thresholds: {
            http_req_failed: [ENV_TEST.FAIL_REQUESTS || req_fail], // http errors should be less than 5%
            http_req_duration: [ENV_TEST.THRESHOLD || req_duration], // 95% of requests should be below 200ms
          },
          stages: [
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_START || vuStart }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || DurationMiddle, target: ENV_TEST.VU_START || vuStart},
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 2 || VuMiddle ** 2 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || DurationMiddle, target: ENV_TEST.VU_MIDDLE ** 2 || VuMiddle ** 2  },
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 3 || VuMiddle ** 3 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || DurationMiddle, target: ENV_TEST.VU_MIDDLE ** 3 || VuMiddle ** 3  },
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 4 || VuMiddle ** 4 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || DurationMiddle, target: ENV_TEST.VU_MIDDLE ** 4 || VuMiddle ** 4  },
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 5 || VuMiddle ** 5 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || DurationMiddle, target: ENV_TEST.VU_MIDDLE ** 5 || VuMiddle ** 5  },
            { duration: '10s', target: 0 }, // scale down. Recovery stage.
          ],
    }

    return options;
}


