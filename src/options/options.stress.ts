import { Options } from "k6/options";
import { ENV_TEST } from "../envs/env.test.control";

export function optionsStress(durationStart: string, durationMiddle: string, durationFinal: string, vuStart: number, 
  vuMiddle: number, req_fail = 'rate<0.05', req_duration = 'p(95)<800'): Options {
    const options = {
        thresholds: {
            http_req_failed: [ENV_TEST.FAIL_REQUESTS || req_fail], // http errors should be less than 5%
            http_req_duration: [ENV_TEST.THRESHOLD || req_duration], // 95% of requests should be below 200ms
          },
          stages: [
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_START || vuStart }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || durationMiddle, target: ENV_TEST.VU_START || vuStart},
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 2 || vuMiddle ** 2 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || durationMiddle, target: ENV_TEST.VU_MIDDLE ** 2 || vuMiddle ** 2  },
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 3 || vuMiddle ** 3 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || durationMiddle, target: ENV_TEST.VU_MIDDLE ** 3 || vuMiddle ** 3  },
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 4 || vuMiddle ** 4 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || durationMiddle, target: ENV_TEST.VU_MIDDLE ** 4 || vuMiddle ** 4  },
            { duration: ENV_TEST.DURATION_START || durationStart, target: ENV_TEST.VU_MIDDLE ** 5 || vuMiddle ** 5 }, // below normal load
            { duration: ENV_TEST.DURATION_MIDDLE || durationMiddle, target: ENV_TEST.VU_MIDDLE ** 5 || vuMiddle ** 5  },
            { duration: durationFinal, target: 0 }, // scale down. Recovery stage.
          ],
    }

    return options;
}


