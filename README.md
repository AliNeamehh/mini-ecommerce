# Mini E-commerce

A full-stack e-commerce application with a **Spring Boot backend**, **PostgreSQL persistence**, authentication, and a modern web frontend.

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Maven
- PostgreSQL
- JWT-based authentication

### Frontend
- Node.js
- Modern web frontend
- API integration with the Spring Boot backend

## Features

- User authentication
- Seeded local administrator account
- Product management
- Paginated product data
- Frontend/backend API integration
- PostgreSQL persistence
- Environment-based frontend API configuration

## Project Structure

```text
mini-ecommerce/
├── backend/   Spring Boot API
└── app/       Frontend application
```

## Running Locally

### Prerequisites

- Java 21
- Maven or the included Maven wrapper
- Node.js 18+
- npm
- PostgreSQL

### Start the Backend

On Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Or build and run the JAR:

```powershell
cd backend
.\mvnw.cmd package
java -jar target\mini-ecommerce-api-0.0.1-SNAPSHOT.jar
```

### Start the Frontend

```bash
cd app
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Local Demo Credentials

These credentials are intended only for the local seeded development account.

```text
Email: admin@gmail.com
Password: admin
```

Do not reuse these credentials in a deployed or production environment.

## Frontend Environment

Copy:

```text
app/.env.example
```

to:

```text
app/.env.local
```

Example:

```text
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

The frontend can also use `/api` when configured to proxy requests to the backend.

## Backend Database Configuration

Configure PostgreSQL through `application.properties` or environment variables such as:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
```

Do not commit real database credentials.

## Screenshots

![Screenshot](images/Screenshot%20(433).png)
![Screenshot](images/Screenshot%20(434).png)
![Screenshot](images/Screenshot%20(435).png)
![Screenshot](images/Screenshot%20(436).png)
![Screenshot](images/Screenshot%20(455).png)

## What This Project Demonstrates

- Full-stack API integration
- Spring Boot backend development
- Relational database persistence
- Authentication flows
- Environment-based configuration
- Debugging frontend/backend integration
