
# Full Stack Application

This is a full-stack application built with Docker, TypeScript, Express, Prisma, and Vite. The application has a frontend and backend, which are containerized using Docker Compose. The frontend is built with React and Vite, while the backend is an Express server using Prisma as an ORM.

## Technologies Used

### Frontend
- **React**: For building user interfaces.
- **Vite**: A fast development build tool for frontend applications.
- **Tailwind CSS**: For styling.
- **Zustand**: A lightweight state management library.
- **Axios**: For handling HTTP requests.

### Backend
- **Express**: A Node.js framework for building REST APIs.
- **Prisma**: An ORM for database management.
- **JWT**: For authentication and authorization.
- **Zod**: For data validation.

### Other
- **Docker**: For containerization.
- **Docker Compose**: For orchestrating multiple services.
- **TypeScript**: For static typing.
- **ESLint**: For linting and code style enforcement.

## Project Structure

```bash
project-root/
├── backend/
│   ├── src/
│   ├── dist/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── docker-compose.yml
└── README.md
```

- **backend/**: Contains the backend code and configuration.
- **frontend/**: Contains the frontend code and configuration.
- **docker-compose.yml**: Configures and orchestrates both frontend and backend services.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (if running locally without Docker)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Set up environment variables**:
   - Copy `.env.example` files from both `backend` and `frontend` directories and create `.env` files.
   - Fill in the required variables.

3. **Install dependencies** (if not using Docker):
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

## Environment Variables

### Backend
The backend `.env` file should include:
   ```
   DATABASE_URL=your_database_url
   ```

### Frontend
The frontend `.env` file should include:
   ```
   VITE_API_URL=http://localhost:3000
   ```

## Running the Project

### Using Docker Compose

1. **Build and start the services**:
   ```bash
   docker-compose up --build
   ```

2. The backend should be running on `http://localhost:3000` and the frontend on `http://localhost:5173`.

### Without Docker

1. **Run the backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Run the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## Scripts

### Backend
- **`npm run dev`**: Runs the backend in development mode with `nodemon` and `ts-node`.

### Frontend
- **`npm run dev`**: Starts the frontend development server on `0.0.0.0` for Docker compatibility.
- **`npm run build`**: Builds the frontend for production.

## Deployment

To deploy the application, you can use services like:
- **AWS EC2**: Deploy using Docker Compose on an EC2 instance.
