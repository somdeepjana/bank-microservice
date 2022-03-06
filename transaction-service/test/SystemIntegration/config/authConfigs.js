// keycloak connection settings
const keycloakUrl= process.env.KEYCLOAK_URL;
const keycloakRealmName= process.env.KEYCLOAK_REALM;
const keycloakTokenEndpoint= `${keycloakUrl}/realms/${keycloakRealmName}/protocol/openid-connect/token`;

// test credentials for keycloak
const testClientId= process.env.TEST_CLIENT_ID;
const testClientSecret= process.env.TEST_CLIENT_SECRET;

const testUsername1= process.env.TEST_USERNAME_1;
const testUser1Password= process.env.TEST_USER_1_PASSWORD;

const testUsername2= process.env.TEST_USER_2;
const testUser2Password= process.env.TEST_USER_2_PASSWORD;

const s2sKey= process.env.S2S_INTREGRITY_KEY;

module.exports={
    keycloakUrl,
    keycloakRealmName,
    keycloakTokenEndpoint,
    testClientId,
    testClientSecret,
    testUsername1,
    testUser1Password,
    testUsername2,
    testUser2Password,
    s2sKey
}