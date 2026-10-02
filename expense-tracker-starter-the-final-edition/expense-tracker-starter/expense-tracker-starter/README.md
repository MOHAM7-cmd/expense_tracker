# Expense Tracker

Expense Tracker is a simple full stack web application that I built to practice connecting a frontend with a backend and a PostgreSQL database.

The application allows the user to add and manage daily expenses. Each expense has a title, amount, category, and date.

## Features

- Add a new expense
- View all expenses
- Edit an existing expense
- Delete an expense
- Filter expenses by category
- Calculate total expenses
- Show the number of expenses
- Show the highest expense
- Store all data in PostgreSQL
- Loading spinner while fetching data
- Success and error messages
- Responsive design for different screen sizes

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

## Project Structure

```text
expense-tracker/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── backend/
│   ├── server.js
│   ├── schema.sql
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## How to Run the Project

### 1. Create the Database

Create a PostgreSQL database called:

```text
expense_tracker
```

Then run the SQL code inside:

```text
backend/schema.sql
```

This will create the expenses table and add the sample data.

### 2. Setup Environment Variables

Create a `.env` file inside the backend folder.

Add your PostgreSQL information:

```env
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

Do not share the `.env` file because it contains the database password.

### 3. Install Backend Packages

Open the terminal inside the backend folder and run:

```bash
npm install
```

### 4. Start the Backend

Run:

```bash
node server.js
```

The server will run on:

```text
http://localhost:3000
```

### 5. Start the Frontend

Open the `frontend` folder in VS Code and run `index.html` using Live Server.

The frontend will communicate with the backend API to load and manage the expenses.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get one expense |
| POST | `/api/expenses` | Add a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

## Expense Categories

The available categories are:

- Food
- Transport
- Bills
- Entertainment
- Other

## Challenges

One of the main challenges for me was connecting the frontend to the backend and understanding how the data moves between the browser, the API, and the database.

I also had some problems while testing the API, especially with request data and making sure the correct status codes and responses were returned.

After testing the endpoints with Thunder Client and checking the browser console, I was able to understand the problems and fix them.

Another thing I learned was that after adding, editing, or deleting an expense, it is better to request the expenses again from the server so the page always displays the current data from the database.

## What I Learned

This project helped me understand how the different parts of a full stack application work together.

I practiced:

- Building REST API endpoints with Express
- Connecting Node.js to PostgreSQL
- Using SQL queries from the backend
- Using async/await and fetch
- Sending and receiving JSON data
- Working with HTTP methods and status codes
- Creating elements using the DOM
- Handling errors with try/catch
- Connecting frontend forms to an API
- Using Bootstrap for the user interface

## Test Video on Google Drive 
https://drive.google.com/file/d/1BCSDWXnH3d1aXmpieWXicLfn07CmGE9A/view?usp=sharing

Screenshots of the application and API testing can be added here.

## Author

Mohammed Al Khudairat