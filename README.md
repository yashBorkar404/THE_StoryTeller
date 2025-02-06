# Collaborative Story Writing Platform

This project is a full-stack web application that allows users to collaboratively write stories. Users can start new stories, contribute to existing ones, and vote on story continuations.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

### Frontend
- React
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

## Usage

1. Register a new account or log in with existing credentials.
2. Browse existing stories on the home page.
3. Click on a story to view its details and contributions.
4. Add your own contribution to a story.
5. Vote on contributions you like.
6. Create a new story by clicking the "Create Story" button.

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `GET /api/stories`: Get all stories
- `POST /api/stories`: Create a new story
- `GET /api/stories/:id`: Get a specific story
- `POST /api/stories/:id/contribute`: Add a contribution to a story
- `POST /api/stories/:id/vote`: Vote on a contribution

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
