var session = require('express-session');
var Keycloak = require('keycloak-connect');
require("dotenv").config();


class KeyCloakConfig {

    _keycloakInstance;
    _memoryStore;
    _keycloakSession;

    _config = {
        clientId: process.env.CLIENT_ID,
        bearerOnly: true,
        serverUrl: process.env.KEYCLOAK_URL,
        realm: process.env.KEYCLOAK_REALM,
        realmPublicKey: process.env.KEYCLOAK_REALM_PUBLIC_KEY,
        sslRequired: "none",
        credentials: {
            secret: process.env.CLIENT_SECRET
        }
    };

    constructor(){
        // console.log("hello const");
        this._memoryStore= new session.MemoryStore();
        this._keycloakSession= session({
            secret: 'some secret',
            resave: false,
            saveUninitialized: true,
            store: this._memoryStore
        });
        // console.log(this._config);
        this._keycloakInstance = new Keycloak({ store: this._memoryStore }, this._config);
    }
}

module.exports = new KeyCloakConfig();