import { Router } from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory from the module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const data = JSON.parse(readFileSync(join(__dirname, "../test-data/data.json"), "utf8"));

router.get("/", (req, res) => {
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

export default router;
