const express = require("express");
const app = express();
const port = 8080;
const data = require("./src/test-data/data.json");


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
        subject: question.subject
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



app.listen(port,'0.0.0.0' ,() => {
  console.log(`Server running on http://localhost:${port}`);
});
