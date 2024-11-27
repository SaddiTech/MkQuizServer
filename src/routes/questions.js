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
    const subject = req.query.subject;
    const topic = req.query.topic; // Topic can now be undefined
    const limit = req.query.limit ? parseInt(req.query.limit) : 1000; // Ensure limit is a number
  
    // Ensure that 'subject' is required
    if (!subject) {
      return res.status(400).json({ error: "Subject is required in query parameter." });
    }
  
    // Filter questions based on subject and optionally on topic
    const filteredQuestions = data.filter((q) => 
      q.subject.toLowerCase() === subject.toLowerCase() &&
      (!topic || q.topic.toLowerCase() === topic.toLowerCase()) // Allow for topics to be optional
    );
  
    // Check if any questions are found after filtering
    if (filteredQuestions.length === 0) {
      return res.status(404).json({ error: "No questions found for the given criteria." });
    }
    
    // Return only up to 'limit' number of questions
    res.json(filteredQuestions.slice(0, limit));
  });
  
export default router;
