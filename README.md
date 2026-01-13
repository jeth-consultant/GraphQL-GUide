GraphQL Guide 🚀

A practical, full-stack guide to building GraphQL applications

📌 Overview

GraphQL-GUide is a full-stack project designed to demonstrate how GraphQL works in a real-world application.
The project uses an Expense Tracker use case to explain GraphQL schemas, queries, mutations, resolvers, and frontend integration.

This repository is structured to help developers learn GraphQL by building, not just reading theory.

🧠 What You’ll Learn

GraphQL fundamentals (Schema, Types, Queries, Mutations)

Writing resolvers

Connecting GraphQL to a database

Frontend consumption of GraphQL APIs

Structuring a full-stack GraphQL project

Handling transactions in GraphQL

Clean project architecture
⚙️ Technologies Used
Backend

Node.js

GraphQL

Apollo Server

TypeScript / JavaScript

Database (MongoDB / SQL – depending on setup)

Frontend

React / Next.js

Apollo Client

GraphQL

TypeScript

CSS / Tailwind

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/jeth-consultant/GraphQL-GUide.git
cd GraphQL-GUide

2️⃣ Backend Setup
cd backend
npm install
npm run dev


The GraphQL server will start at:

http://localhost:4000/graphql


You can access GraphQL Playground / Apollo Sandbox to test queries and mutations.

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:3000

🧩 GraphQL Schema Example
type Transaction {
  id: ID!
  title: String!
  amount: Float!
  type: String!
  createdAt: String!
}

type Query {
  transactions: [Transaction!]!
}

type Mutation {
  addTransaction(
    title: String!
    amount: Float!
    type: String!
  ): Transaction!
}

🔍 Sample Queries
Fetch all transactions
query {
  transactions {
    id
    title
    amount
    type
    createdAt
  }
}

✍️ Sample Mutation
mutation {
  addTransaction(
    title: "Groceries"
    amount: 1500
    type: "EXPENSE"
  ) {
    id
    title
    amount
  }
}

🧪 Features

📊 Expense tracking (income & expenses)

🔁 GraphQL Queries & Mutations

🧩 Modular resolvers

🔗 Frontend ↔ Backend GraphQL integration

📚 Beginner-friendly GraphQL guide structure

📘 Who This Project Is For

Beginners learning GraphQL

Frontend developers wanting backend exposure

Backend developers learning GraphQL APIs

Full-stack developers building production-ready APIs

🛠️ Future Improvements

Authentication & authorization (JWT)

Pagination & filtering

Subscriptions (real-time updates)

Better error handling

Deployment (Docker + Cloud)

👤 Author

Jethro Cheruiyot Sumbeiywet
Full-Stack Developer
📍 Kenya
