Eispraxis is a full-stack web app for managing customers, tracking monthly payments, and keeping customer notes in one place. The goal of the project was to build a custom practical management tool while learning how a React frontend communicates with an ASP.NET Core Web API and a SQL database.

The application allows users to:

* View all customers
* Create, search, edit and delete customers
* Track monthly payments for each customer
* Add and remove customer notes
* Navigate through different payment years
* Keep customer information organized in a clean interface

## Stack

Frontend

* React w/ React Router
* JavaScript
* SCSS

Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server

## Project Structure


```text
React
↓
Controllers
↓
Services
↓
Entity Framework Core
↓
SQL Server
```

Controllers handle HTTP requests and responses, Services contain the application logic, and EF Core is responsible for communicating with the database.

## Features

* Customer management (Create, Read, Update, Delete)
* Payment tracking by month and year
* Customer notes (Create, Read, Delete)
* Dashboard with basic stats

## Future Improvements

Some of my ideas for extending the project include:

* User authentication and authorization
* Real time notifications using SignalR (e.g. reminders for overdue payments)
* React Native mobile application connected to the same API
