export const setupEnv = (setEnv)  => {
    const ENVS = {
        NONPROD: {
            API_URL: 'https://m7ztiyopb8.execute-api.us-east-1.amazonaws.com/proxy/',
            COGNITO_URL: 'https://cognito-idp.us-east-1.amazonaws.com/',
            SAP_URL: 'https://m7ztiyopb8.execute-api.us-east-1.amazonaws.com/api/v1/',
            COGNITO_CLIENT: 'o9od3jf3nqmfb0s8k8v3p1hcg',
            COGNITO_CLIENT_SAP: '454138p4irfg7gjd428af7pqkf',
            USER_BACK_INVESTOR: "investidor_back_test@mailinator.com",
            USER_BACK_SUPPLIER: "fornecedor_back_test@mailinator.com",
            USER_BACK_MANAGER: "gestor_back_test@mailinator.com",
            PASSWORD_ENTITY: "backBack55221@",
            USER_INTEGRATOR: "integracao.api@mailinator.com",
            PASSOWRD_INTEGRATOR: "backApi@2023",
            COGNITO_REGION: "us-east-1",
            COGNITO_USER_POOL_ID: "us-east-1_Enxdo9USw",
        },
        PROD: {
            API_URL: 'https://8xbha0ib2d.execute-api.us-east-1.amazonaws.com/proxy/',
            COGNITO_URL: 'https://cognito-idp.us-east-1.amazonaws.com/',
            SAP_URL: 'https://m7ztiyopb8.execute-api.us-east-1.amazonaws.com/api/v1/',
            COGNITO_CLIENT: 'o9od3jf3nqmfb0s8k8v3p1hcg',
            COGNITO_CLIENT_SAP: '454138p4irfg7gjd428af7pqkf',
            USER_BACK_INVESTOR: "investidor_back_test@mailinator.com",
            USER_BACK_SUPPLIER: "fornecedor_back_test@mailinator.com",
            USER_BACK_MANAGER: "gestor_back_test@mailinator.com",
            PASSWORD_ENTITY: "backBack55221@",
            USER_INTEGRATOR: "integracao.api@mailinator.com",
            PASSOWRD_INTEGRATOR: "backApi@2023",
            COGNITO_REGION: "us-east-1",
            COGNITO_USER_POOL_ID: "us-east-1_Enxdo9USw",

        },
        DEVELOP: {
            API_URL: 'https://8xbha0ib2d.execute-api.us-east-1.amazonaws.com/proxy/',
            COGNITO_URL: 'https://cognito-idp.us-east-1.amazonaws.com',
            SAP_URL: 'https://8xbha0ib2d.execute-api.us-east-1.amazonaws.com/api/v1/',
            COGNITO_CLIENT: 'o9od3jf3nqmfb0s8k8v3p1hcg',
            COGNITO_CLIENT_SAP: '454138p4irfg7gjd428af7pqkf',
            USER_BACK_INVESTOR: "investidor_back_test@mailinator.com",
            USER_BACK_SUPPLIER: "fornecedor_back_test@mailinator.com",
            USER_BACK_MANAGER: "gestor_back_test@mailinator.com",
            USER_INTEGRATOR: "integracao.api@mailinator.com",
            PASSOWRD_INTEGRATOR: "backApi@2023",
            PASSWORD_ENTITY: "backBack55221@",
            COGNITO_REGION: "us-east-1",
            COGNITO_USER_POOL_ID: "us-east-1_Enxdo9USw",

        },

    }   


    return ENVS[setEnv]

}


