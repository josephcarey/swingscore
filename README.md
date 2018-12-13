# swingscore

swingscore is a full-stack application for scoring west coast swing competitions. It allows contest organizers to add competitors and generate couples, and it allows judges to drag-and-drop couples in order to place them. It then performs the relative placement caluclations and displays the scores and results.

## Getting Started

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Postico](https://eggerapps.at/postico/) (or similar)

### Local copy

Clone and/or fork the repo so that you have your own copy on your local machine.

### Create database and tables

Create a new PostgreSQL database called `swingscore`. Open a SQL query within your new database. Locate the `database.sql` file within the project root, copy the contents into the query, and run it.

If you would like to use the provided test data, locate the `testData.sql` file and follow the same process.

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  Then, replace "superDuperSecret" with a random string.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Built With

- [React](https://reactjs.org/) - Front End Web Framework
- [React Redux](https://react-redux.js.org/) - State Container
- [Node.js](https://nodejs.org/) - Server Runtime Environment
- [Express](https://expressjs.com/) - Back End Framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [React-Beautiful-Dnd](https://github.com/atlassian/react-beautiful-dnd) - Used for the judging view
- ...for a full list of dependencies, see `package.json`

## Acknowledgements

- Luke Schlangen - [LukeSchlangen](https://github.com/LukeSchlangen)
- Prime Digital Academy - https://primeacademy.io/
