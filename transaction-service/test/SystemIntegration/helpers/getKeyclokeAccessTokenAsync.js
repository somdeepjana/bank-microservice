const axios= require("axios").default;

const {
    keycloakTokenEndpoint,
    testClientId,
    testClientSecret,
    testUsername1,
    testUser1Password,
    testUsername2,
    testUser2Password
}= require("../config/authConfigs");

const tokenRequestPayload=(username, password)=>{
    const searchParam= new URLSearchParams();
    searchParam.append("grant_type", "password");
    searchParam.append("username", username);
    searchParam.append("password", password);
    searchParam.append("client_id", testClientId);
    searchParam.append("client_secret", testClientSecret);

    return searchParam;
}

const getKeycloakAccessTokenAsyncFunc= (username, password)=>{
    return async()=>{

        // Setting up request payload
        const accessTokenRequestPayload= tokenRequestPayload(username, password);
    
        const response= await axios.post(keycloakTokenEndpoint,
            accessTokenRequestPayload,
            {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
        return response.data.access_token;
    };
}

// const getKeycloakAccessTokenAsync= 

module.exports= {
    getKeycloakAccessToken1Async: getKeycloakAccessTokenAsyncFunc(testUsername1, testUser1Password),
    getKeycloakAccessToken2Async: getKeycloakAccessTokenAsyncFunc(testUsername2, testUser2Password)
};