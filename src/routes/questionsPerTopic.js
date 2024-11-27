import { Router } from 'express';
import getRandomQuestionsPerTopic from "../test-data/processer/randomQuestionFromTopic.js";
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory from the module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const data = JSON.parse(readFileSync(join(__dirname, "../test-data/data.json"), "utf8"));

router.get("/", (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 1000;
    const randomQuestions = getRandomQuestionsPerTopic(data, limit);
    res.json(randomQuestions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
});

export default router;
