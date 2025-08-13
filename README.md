# Notes API

A RESTful API for managing notes with user authentication.

## Features

- User registration and authentication
- JWT-based authorization
- CRUD operations for notes
- MongoDB database integration
- Password hashing with bcrypt

## API Endpoints

### Authentication
- `POST /user/signup` - Create new user account
- `POST /user/login` - Login existing user

### Notes (Requires Authentication)
- `GET /notes` - Get all notes for authenticated user
- `POST /notes` - Create new note
- `PUT /notes/:id` - Update note by ID
- `DELETE /notes/:id` - Delete note by ID

## Environment Variables

Set these environment variables in your deployment platform:

```
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
PORT=5000
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your environment variables

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## Deployment

### Render.com
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard
5. Deploy!

## API Usage

### Register a new user:
```bash
curl -X POST http://localhost:5000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Create a note:
```bash
curl -X POST http://localhost:5000/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"My Note","description":"Note content"}'
```