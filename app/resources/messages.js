const CLIENTID_MISSING = 'clientId or secretKey is missing in the request';
const CLIENTID_BLANK = 'clientId or secretKey is blank/empty in the request';
const CLIENTID_LEN = 'clientId or secretKey must be minimum 3 characters and maximum 30 characters';
const USER_CREDENTIALS_INVALID = 'user credentials does not match';
const ACCESS_TOKEN_MISSING = 'accessToken is missing in request header';
const ACCESS_TOKEN_BLANK = 'accessToken is blank/empty in the request header';
const ACCESS_TOKEN_INVALID = 'accessToken is invalid or has expired';

module.exports = {
    CLIENTID_MISSING,
    CLIENTID_BLANK,
    CLIENTID_LEN,
    USER_CREDENTIALS_INVALID,
    ACCESS_TOKEN_MISSING,
    ACCESS_TOKEN_BLANK,
    ACCESS_TOKEN_INVALID
}