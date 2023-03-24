export const setupEnv = (setEnv)  => {
    const ENVS = {
        NONPROD: {
            API_URL: '...',
            
        },
        PROD: {
            API_URL: '...',


        },
        DEVELOP: {
            API_URL: '...',

        },

    }   


    return ENVS[setEnv]

}


