# Notes API

A RESTful API for managing notes with user authentication.

## Features

- User registration and authentication
- JWT-based authorization
- CRUD operations for notes
- MongoDB database integration

## Endpoints

### Authentication
- `POST /user/signup` - Register new user
- `POST /user/login` - Login user

### Notes (Requires Authentication)
- `GET /notes` - Get all user notes
- `POST /notes` - Create new note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## Environment Variables

```
PORT=5000
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

## Installation

```bash
npm install
npm start
```

## Development

```bash
npm run dev
```
