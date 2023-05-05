export const setupEnv = (setEnv)  => {
    const ENVS = {
        NONPROD: {
            API_URL: 'https://nonprodapi.com',
        },
        PROD: {
            API_URL: 'https://proddapi.com',
           

        },
        DEVELOP: {
            API_URL: 'https://nonprodapi.com',


        },

    }   


    return ENVS[setEnv]

}


