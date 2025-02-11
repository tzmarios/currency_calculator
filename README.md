# Currency Calculator App

## Introduction

Welcome to the Currency Calculator App! This full-stack application allows users to convert currencies using dynamic exchange rates. It features:

- **Backend**: Built with Node.js and Express.js, interfacing with a MongoDB database.
- **Frontend**: Developed using React and Vite and styled with Tailwind CSS.
- **Authentication**: User authentication and authorization using JWT tokens.
- **Testing**: Backend functionality tested using Jest.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
  - [Currency Routes](#currency-routes)
  - [Authentication Routes](#authentication-routes)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js (v14 or later) and npm**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: Install MongoDB locally or have access to a remote MongoDB instance.

### Environment Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tzmarios/currency_calculator.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd currency_calculator
   ```

3. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

4. **Install Frontend Dependencies**

   ```bash
   cd frontend
   npm install
   ```

5. **Set Up Environment Variables**

   In both the server and client directories, copy the example `.env_example` file to create your `.env` file:

   ```bash
   cp .env_example .env
   ```

   **Backend .env Configuration (server/.env):**

   ```dotenv
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/currency_calculator
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_jwt_secret` with a secure secret key.

6. **Populate Currencies**

   To populate the database with some initial currencies, run the following command in the backend directory:

   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. **Start the Backend Server**

Open a terminal window, navigate to the server directory, and run:

```bash
cd backend
npm run dev
```

This command starts the Express.js server in development mode with nodemon on port 5000.

2. **Start the Frontend Client**

   In a new terminal window, navigate to the client directory, and run:

   ```bash
   cd frontend
   npm run dev
   ```

   This command starts the React development server on port 5173 by default.

3. **Access the Application**

   Open your web browser and navigate to `http://localhost:5173`.

### Running Tests

**Backend Tests with Jest**

To run the backend tests using Jest, navigate to the server directory and execute:

```bash
cd backend
npm run test
```

### API Endpoints

This document provides details about the API endpoints available in the Currency Calculator App.

#### Currency Routes

### Get All Currencies

Retrieves a list of all available currencies.

- **URL**: `/api/currencies`
- **Method**: `GET`
- **Auth required**: No

#### Happy Path

```json
{
  "status": 200,
  "sucess": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "code": "string",
      "exRate": "number"
    },
    {
      "id": "string",
      "name": "string",
      "code": "string",
      "exRate": "number"
    },
    ...
  ]
}
```

#### Unhappy Path

```json
{
  "status": 500,
  "sucess": false,
  "message": "Internal Server Error"
}
```

### Get Currency by id

Retrieves a currency by its unique identifier.

- **URL**: `/api/currencies/:id`
- **Method**: `GET`
- **Auth required**: No

#### Happy Path

```json
{
  "status": 200,
  "sucess": true,
  "data": {
    "id": "string",
    "name": "string",
    "code": "string",
    "exRate": "number"
  }
}
```

#### Unhappy Path

```json
{
  "status": 404,
  "sucess": false,
  "message": "Currency not found."
}
```

```json
{
  "status": 500,
  "sucess": false,
  "message": "Internal Server Error"
}
```

### Create Currency

Creates a new currency.

- **URL**: `/api/currencies`
- **Method**: `POST`
- **Auth required**: Yes

#### Happy Path

```json
{
  "status": 201,
  "sucess": true,
  "message": "Currency with id <id> added",
  "data": {
    "id": "string",
    "name": "string",
    "code": "string",
    "exRate": "number"
  }
}
```

#### Unhappy Path

```json
{
  "status": 400,
  "sucess": false,
  "message": "Request body is missing."
}

{
  "status": 400,
  "sucess": false,
  "message": "Validation error"
}

{
  "status": 403,
  "sucess": false,
  "message": "Unauthorized"
}

{
  "status": 500,
  "sucess": false,
  "message": "Internal Server Error"
}
```

#### Request Body

```json
{
  "name": "string",
  "code": "string",
  "exRate": "number"
}
```

### Update Currency

Updates an existing currency.

- **URL**: `/api/currencies/:id`
- **Method**: `PUT`
- **Auth required**: Yes

#### Happy Path

```json
{
  "status": 200,
  "sucess": true,
  "message": "Currency with id <id> updated",
  "data": {
    "id": "string",
    "name": "string",
    "code": "string",
    "exRate": "number"
  }
}
```

#### Unhappy Path

```json
{
  "status": 400,
  "sucess": false,
  "message": "Request body is missing."
}

{
  "status": 404,
  "sucess": false,
  "message": "Currency not found."
}

{
  "status": 403,
  "sucess": false,
  "message": "Unauthorized"
}

{
  "status": 500,
  "sucess": false,
  "message": "Internal Server Error"
}
```

#### Request Body

```json
{
  "name": "string",
  "code": "string",
  "exRate": "number"
}
```

### Delete Currency

Deletes a currency by its unique identifier.

- **URL**: `/api/currencies/:id`
- **Method**: `DELETE`
- **Auth required**: Yes

#### Happy Path

```json
{
  "status": 200,
  "sucess": true,
  "message": "Currency with id <id> deleted"
}
```

#### Unhappy Path

```json
{
  "status": 400,
  "sucess": false,
  "message": "Currency with id <id> not found"
}

{
  "status": 403,
  "sucess": false,
  "message": "Unauthorized"
}

{
  "status": 500,
  "sucess": false,
  "message": "Internal Server Error"
}
```

### Convert Currency

Converts an amount from one currency to another.

- **URL**: `/api/currencies/convert`
- **Method**: `POST`
- **Auth required**: No

#### Happy Path

```json
{
  "status": 200,
  "sucess": true,
  "data": {
    "convertedAmount": "number"
  }
}
```

#### Unhappy Path

```json
{
  "status": 400,
  "sucess": false,
  "message": "Currency pair not found."
}

{
  "status": 400,
  "sucess": false,
  "message": "Amount must be a number."
}

{
  "status": 500,
  "sucess": false,
  "message": "Internal Server Error"
}
```

## Authentication Routes

### Register User

Registers a new user.

- **URL**: `/api/auth/register`

- **Method**: `POST`
- **Auth required**: No

#### Happy Path

```json
{
  "status": 201,
  "message": "User registered successfully",
  "id": "string",
  "name": "string"
}
```

#### Unhappy Path

```json
{
  "status": 400,
  "message": "Please enter all fields"
}

{
  "status": 400,
  "message": "Username must be less than 25 characters"
}

{
  "status": 400,
  "message": "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
}

{
  "status": 400,
  "message": "User with that username already exists"
}

{
  "status": 500,
  "message": "Internal Server Error"
}
```

#### Request Body

```json
{
  "username": "string",
  "password": "string"
}
```

### Login User

Logs in an existing user.

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth required**: No

#### Happy Path

```json
{
  "status": 200,
  "message": "User: <username> logged in successfully",
  "token": "string"
}
```

#### Unhappy Path

```json
{
  "status": 400,
  "message": "Please enter all fields"
}

{
  "status": 400,
  "message": "User does not exist"
}

{
  "status": 400,
  "message": "Invalid credentials"
}

{
  "status": 500,
  "message": "Internal Server Error"
}
```

#### Request Body

```json
{
  "username": "string",
  "password": "string"
}
```

## Scripts

### Backend Scripts

- **`npm run dev`**: Starts the Express.js server in development mode using nodemon.

- **`npm run test`**: Runs the Jest test suite for the backend.

### Frontend Scripts

- **`npm run dev`**: Starts the React development server.

- **`npm run build`**: Builds the React application for production.

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT

- **Frontend**:

  - React
  - Vite
  - Tailwind CSS

- **Testing**:
  - Jest
