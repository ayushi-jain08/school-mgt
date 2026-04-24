# School Management API

This is a Node.js API to manage school data. It uses Express.js and MySQL.

## Setup Instructions

1. **Prerequisites**: Make sure you have Node.js and MySQL Server installed.
2. **Install Dependencies**: Run `npm install` in the command line within this folder.
3. **Database Configuration**:
   - Open MySQL and run the SQL commands found in `init_db.sql` to create the database and table.
   - Create a file named `.env` in the root folder, and copy the contents of `.env.example` into it. Adjust the `DB_PASSWORD` and `DB_USER` to match your local MySQL configuration.
4. **Start the server**: Run `npm start` (if configured in package.json) or `node index.js`.

## API Endpoints

### 1. Add School
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "name": "Sample School",
    "address": "Main Street, Tech City",
    "latitude": 28.7041,
    "longitude": 77.1025
  }
  ```

### 2. List Schools
- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Query Params**: `latitude` and `longitude`
- **Description**: Returns a list of schools sorted by distance (in KM) from the provided coordinates.
- **Example**: `/listSchools?latitude=28.7041&longitude=77.1025`

## Testing (Postman)
A Postman collection is included in this repository: `School_Management_API.postman_collection.json`. You can import this into Postman to test the APIs quickly.

## Hosting & Deployment
To host this API online (e.g., on Render or Railway):
1. **GitHub**: Push this repository to GitHub.
2. **Database Hosting**: Create a managed MySQL database on a provider like Aiven, PlanetScale, or AWS RDS.
3. **App Hosting**: 
   - Connect your GitHub repository to [Render](https://render.com) (as a Web Service) or [Railway](https://railway.app).
   - Set the necessary environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`) in the hosting panel.
   - Deploy!
