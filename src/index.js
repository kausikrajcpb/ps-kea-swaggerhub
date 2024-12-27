// Reference: https://github.com/scottie1984/swagger-ui-express/tree/master
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const artifactSwagger = require('./docs/ps-kea-artifact-service-swagger.json');
const authSwagger = require('./docs/ps-kea-auth-service-swagger.json');
const nlpSwagger = require('./docs/ps-kea-nlp-service-swagger.json');
const nluSwagger = require('./docs/ps-kea-nlu-service-swagger.json');
const notificationSwagger = require('./docs/ps-kea-notification-service-swagger.json');
const smartCompleteSwagger = require('./docs/ps-kea-smartcomplete-service-swagger.json');

var options = {}

app.use('/api-docs/artifact', swaggerUi.serveFiles(artifactSwagger, options), swaggerUi.setup(artifactSwagger));

app.use('/api-docs/auth', swaggerUi.serveFiles(authSwagger, options), swaggerUi.setup(authSwagger));

app.use('/api-docs/nlp', swaggerUi.serveFiles(nlpSwagger, options), swaggerUi.setup(nlpSwagger));

app.use('/api-docs/nlu', swaggerUi.serveFiles(nluSwagger, options), swaggerUi.setup(nluSwagger));

app.use('/api-docs/notification', swaggerUi.serveFiles(notificationSwagger, options), swaggerUi.setup(notificationSwagger));

app.use('/api-docs/smartcomplete', swaggerUi.serveFiles(smartCompleteSwagger, options), swaggerUi.setup(smartCompleteSwagger));

const SWAGGER_APP_PORT = process.env.SWAGGER_APP_PORT || 5000;

app.listen(SWAGGER_APP_PORT, () => console.log(`Swagger Hub Running on Port ${SWAGGER_APP_PORT}`));
