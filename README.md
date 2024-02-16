# Resippy Repository

This project is a repository for recipes I have previously made so I can remember that these recipes exist for longer than a month at a time :)

## Stack

- NPM
- Vite
- React
- Typescript
- Node
- Express
- Postgresql

## Running The Application

### Frontend

1. Navigate to the 'client' folder.
2. Run `npm run dev`
3. Frontend URLs:
4. Homepage: http://localhost:5173
5. Index: http://localhost:5173/recipes
6. Create Recipe: http://localhost:5173/recipes/create

### Backend

1. Navigate to the 'server' folder.
2. Run `npm run dev`
3. Check Backend by navigating to this URL: http://localhost:8000/recipes

## Findings Log

1. If I want to store high quality photos's on MongoDB I will need to use something called GridFS: https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/
2. Was encountering issues running the backend. Fixed by whitelisting IP address of new working location 🤦‍♀️
3. Typescript doesn't like some of the things Javascript accepts e.g. react-icons doesn't like the use of 'className' instead of attributes like 'color' etc.

## Work Log

1. Currently implementing the frontend + backend from this tutorial: https://medium.com/@arpitha.rajeev37/mern-stack-refresher-crud-operations-for-a-book-store-15ff826636e9
2. Currently figuring out how to make the input of arrays smoother
