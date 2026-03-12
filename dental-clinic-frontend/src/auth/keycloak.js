import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:8085/auth',
    realm: 'dental-clinic',
    clientId: 'dental-frontend'
};

const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = (onAuthenticatedCallback) => {
    console.log("Initializing Keycloak...");
    keycloak.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        enableLogging: true,
        flow: 'standard'
    })
        .then((authenticated) => {
            console.log("Keycloak initialized. Authenticated:", authenticated);
            onAuthenticatedCallback();
        })
        .catch(err => {
            console.error("Keycloak initialization failed!", err);
            // Fallback for demo purposes if Keycloak is totally unreachable
            // onAuthenticatedCallback(); 
        });
};

export const doLogin = keycloak.login;
export const doLogout = keycloak.logout;
export const getToken = () => keycloak.token;
export const isLoggedIn = () => !!keycloak.token;
export const updateToken = (successCallback) => {
    keycloak.updateToken(10)
        .then(successCallback)
        .catch(doLogin);
};
export const getUsername = () => keycloak.tokenParsed?.preferred_username;
export const hasRole = (role) => keycloak.hasResourceRole(role) || keycloak.hasRealmRole(role);

export default keycloak;
