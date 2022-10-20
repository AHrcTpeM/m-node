"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./common/transform.interceptor");
const http_exception_filter_1 = require("./common/http-exception.filter");
const AWS = require("aws-sdk");
require("dotenv/config");
async function bootstrap() {
    AWS.config.update({
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_KEY,
        "region": process.env.AWS_REGION
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Star Wars')
        .setDescription('The Star Wars API description')
        .setVersion('0.0.1')
        .addTag('people')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map