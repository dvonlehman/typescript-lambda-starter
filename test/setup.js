require('dotenv').config();

// Possibly override certain environment variables that should
// always be a specific value when running tests.
process.env.DO_NOT_SEND_EMAILS = 'true';
