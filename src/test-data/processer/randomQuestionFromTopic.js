function getRandomQuestionsPerTopic(data, limit) {
    // Group questions by topic
    const questionsByTopic = data.reduce((acc, question) => {
        const topic = question.topic;
        if (!acc[topic]) {
            acc[topic] = [];
        }
        acc[topic].push(question);
        return acc;
    }, {});

    // Get random questions from each topic
    const result = [];
    for (const topic in questionsByTopic) {
        const topicQuestions = questionsByTopic[topic];
        const randomQuestions = [];

        // Create a copy of the array to avoid modifying original
        const availableQuestions = [...topicQuestions];

        // Get specified number of random questions
        for (let i = 0; i < limit && availableQuestions.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            randomQuestions.push(availableQuestions[randomIndex]);
            availableQuestions.splice(randomIndex, 1);
        }

        result.push(...randomQuestions);
    }

    // Shuffle the final array to mix questions from different topics
    return result.sort(() => Math.random() - 0.5);
}

export default getRandomQuestionsPerTopic;