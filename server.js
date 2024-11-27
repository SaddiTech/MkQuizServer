import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from './swagger/docs.js';
import getRandomQuestionsPerTopic from "./src/test-data/processer/randomQuestionFromTopic.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(
  readFileSync(join(__dirname, "src/test-data/data.json"), "utf8")
);
const app = express();
const port = 8080;

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/questions", (req, res) => {
  const topic = req.query.topic;
  const limit = req.query.limit ? req.query.limit : 1000;

  if (!topic) {
    return res
      .status(400)
      .json({ error: "Topic is required in query parameter." });
  }

  const filteredQuestions = data.filter(
    (q) => q.topic.toLowerCase() === topic.toLowerCase()
  );

  if (filteredQuestions.length === 0) {
    return res
      .status(404)
      .json({ error: "No questions found for the given topic." });
  }
  res.json(filteredQuestions.slice(0, limit));
});

app.get("/topics", (req, res) => {
  const topicStats = data.reduce((acc, question) => {
    const topic = question.topic;
    if (!acc[topic]) {
      acc[topic] = {
        name: topic,
        count: 1,
        subject: question.subject,
      };
    } else {
      acc[topic].count++;
    }
    return acc;
  }, {});

  const topics = Object.values(topicStats);

  if (topics.length === 0) {
    return res.status(404).json({ error: "No topics found." });
  }

  res.json(topics);
});

app.get("/questionsPerTopic", (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 1000;
    const randomQuestions = getRandomQuestionsPerTopic(
      data,
      limit
    );
    res.json(randomQuestions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
