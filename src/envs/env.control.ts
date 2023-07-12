export const setupEnv = (setEnv: string)  => {
    const ENVS: {[key: string]: { API_URL: string }} = {
        NONPROD: {
            API_URL: 'https://swapi.dev/api',
        },
        PROD: {
            API_URL: 'https://proddapi.com',

        },
        DEVELOP: {
            API_URL: 'https://swapi.dev/api',
        },

    };   

    return ENVS[setEnv];

}


