// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MK-Kids Maths Quiz API',
      version: '1.0.0',
      description: 'API for serving mathematics quiz questions',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local development server',
      },
      {
        url: 'https://mk-kids-maths-quiz-124822148298.europe-west2.run.app',
        description: 'Dev server',
      },
    ],
    components: {
      schemas: {
        Question: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            subject: { type: 'string' },
            // Add other question properties based on your data model
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        TopicSummary: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            count: { type: 'integer' },
            subject: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/questions': {
        get: {
          summary: 'Get questions by topic',
          parameters: [
            { in: 'query', name: 'subject', required: true, schema: { type: 'string' } },
            { in: 'query', name: 'topic', required: false, schema: { type: 'string' } },
            { in: 'query', name: 'limit', required: false, schema: { type: 'integer', default: 1000 } },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Question' } } } },
            },
            '400': {
              description: 'Bad request',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
      '/topics': {
        get: {
          summary: 'Get all topics with statistics',
          responses: {
            '200': {
              description: 'Successful response',
              content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/TopicSummary' } } } },
            },
          },
        },
      },
      '/questionsPerTopic': {
        get: {
          summary: 'Get random questions for each topic with limit',
          parameters: [
            { in: 'query', name: 'limit', required: false, schema: { type: 'integer', default: 1000 } },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: { 'application/json': { schema: { type: 'array', items: { type: 'object', properties: { limit: { type: 'integer' } } } } } },
            },
          },
        },
      },
    },
  },
  apis: ['./server.js'], // Path to the API docs
};

export default swaggerOptions;
