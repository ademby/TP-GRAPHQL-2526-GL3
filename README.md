# Gestionnaire de CVs - GraphQL API

**Prerequisites:**

- Node.js installed
- Docker Desktop installed and running

**Setup**

- `npm install`

- `docker start nest-cv-postgres`  
  or  
  `docker compose up -d`

- `npm run seed` # reset and seed database

- `npm run dev`

- Open GraphiQL at: `http://localhost:4000/graphql`

**Potential Improvements**

- add a Soft-Delete logic
- add pagination and filtering on CV queries
- move data access from in-memory to PostgreSQL repositories
