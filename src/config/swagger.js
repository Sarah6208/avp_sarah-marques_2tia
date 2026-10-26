<<<<<<< HEAD
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Raças de Cachorro",
      version: "1.0.0",
      description: "API com raças de cachorro para consultar."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "API com raças de cachorro para consultar."
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer SEU_TOKEN"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
=======
import express from "express";
import "doten/config";
import swaggerUi from "swagger-ui-express";

import racas from "./src/racas/express";
import swaggerSpec from ""
>>>>>>> 1a6cbc05290697039bc880bb57d1c4abfbabd3e5
