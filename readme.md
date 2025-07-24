

# ragboost Microservice

## Overview


ragboost is a basic, easy-to-deploy microservice designed to provide endpoints for general Retrieval-Augmented Generation (RAG) workloads. It is intended to be simple to set up and integrate into your existing infrastructure.

**Note:** This project is currently in progress. Features, endpoints, and documentation are subject to change as development continues.

## Features

- Lightweight and minimal setup
- Provides RESTful endpoints for RAG-based operations
- Easily configurable via environment variables
- Suitable for rapid prototyping and production use

## Environment Variables

The service requires the following environment variables to function properly:

- `openAiKey` – OpenAI API key
- `chromaDbHost` – ChromaDB host URL
- `MONGO_URI` – MongoDB connection string
- `BASIC_AUTH_TOKEN` – Basic authentication token (all api request to the service need to be with a basic auth token)

## License

MIT License
