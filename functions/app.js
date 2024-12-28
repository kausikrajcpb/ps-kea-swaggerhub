/**
 * References:
 * 1. https://github.com/scottie1984/swagger-ui-express/tree/master
 * 2. https://www.geeksforgeeks.org/how-to-deploy-node-js-app-on-netlify/
 * 3. https://www.youtube.com/watch?v=8x0Dty5D6CA
 * 4. https://www.clouddefense.ai/code/javascript/example/swagger-ui-express
 */

const express = require('express');
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');

const artifactSwagger = require('./docs/ps-kea-artifact-service-swagger.json');
const authSwagger = require('./docs/ps-kea-auth-service-swagger.json');
const nlpSwagger = require('./docs/ps-kea-nlp-service-swagger.json');
const nluSwagger = require('./docs/ps-kea-nlu-service-swagger.json');
const notificationSwagger = require('./docs/ps-kea-notification-service-swagger.json');
const smartCompleteSwagger = require('./docs/ps-kea-smartcomplete-service-swagger.json');

var options = {}

var env = (process.env.NODE_ENV || 'prod').trim();
console.log("Starting Swagger Hub for environment: " + process.env.NODE_ENV);
if (env === 'localdev') {
    console.log("Express App Swagger Hub");
    app.use('/api-docs/artifact', swaggerUi.serveFiles(artifactSwagger, options), swaggerUi.setup(artifactSwagger));
    app.use('/api-docs/auth', swaggerUi.serveFiles(authSwagger, options), swaggerUi.setup(authSwagger));
    app.use('/api-docs/nlp', swaggerUi.serveFiles(nlpSwagger, options), swaggerUi.setup(nlpSwagger));
    app.use('/api-docs/nlu', swaggerUi.serveFiles(nluSwagger, options), swaggerUi.setup(nluSwagger));
    app.use('/api-docs/notification', swaggerUi.serveFiles(notificationSwagger, options), swaggerUi.setup(notificationSwagger));
    app.use('/api-docs/smartcomplete', swaggerUi.serveFiles(smartCompleteSwagger, options), swaggerUi.setup(smartCompleteSwagger));

    app.use('/dist/', express.static('dist'));

    const SWAGGER_APP_PORT = process.env.SWAGGER_APP_PORT || 5000;
    app.listen(SWAGGER_APP_PORT, () => console.log(`Swagger Hub Running on Port ${SWAGGER_APP_PORT}`));
} else {
    console.log("Netlify Swagger Hub");
    router.use('/api-docs/artifact', swaggerUi.serve, (req, res, next) => {
        const swaggerUiHandler = swaggerUi.setup(artifactSwagger);
        swaggerUiHandler(req, res, next);
    });

    router.use('/api-docs/auth', swaggerUi.serve, (req, res, next) => {
        const swaggerUiHandler = swaggerUi.setup(authSwagger);
        swaggerUiHandler(req, res, next);
    });

    router.use('/api-docs/nlp', swaggerUi.serve, (req, res, next) => {
        const swaggerUiHandler = swaggerUi.setup(nlpSwagger);
        swaggerUiHandler(req, res, next);
    });

    router.use('/api-docs/nlu', swaggerUi.serve, (req, res, next) => {
        const swaggerUiHandler = swaggerUi.setup(nluSwagger);
        swaggerUiHandler(req, res, next);
    });

    router.use('/api-docs/notification', swaggerUi.serve, (req, res, next) => {
        const swaggerUiHandler = swaggerUi.setup(notificationSwagger);
        swaggerUiHandler(req, res, next);
    });

    router.use('/api-docs/smartcomplete', swaggerUi.serve, (req, res, next) => {
        const swaggerUiHandler = swaggerUi.setup(smartCompleteSwagger);
        swaggerUiHandler(req, res, next);
    });

    app.use('/dist/', express.static('dist'));

    // app.use("/.netlify/functions/app", router);
    app.use('/api/', router);

    module.exports.handler = serverless(app);
}
