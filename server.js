import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from './swagger/docs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Import route files
import questionsRoute from './src/routes/questions.js';
import topicsRoute from './src/routes/topics.js';
import questionsPerTopicRoute from './src/routes/questionsPerTopic.js';

const data = JSON.parse(readFileSync(join(__dirname, "src/test-data/data.json"), "utf8"));
const app = express();
const port = 8080;

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use imported routes
app.use("/questions", questionsRoute);
app.use("/topics", topicsRoute);
app.use("/questionsPerTopic", questionsPerTopicRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
