# CashCove

CashCove is a financial application that provides wallet funding, locked funds management, and transaction tracking capabilities. It is built using **TypeScript, Express, TypeGraphQL, SQLite, and Apollo Server**.

## Features

- **User Authentication & Authorization**
- **Wallet Management**
  - Fund wallets in different currencies
  - Retrieve wallet details
- **Locked Funds Management**
  - Lock funds for a specified period
  - Unlock funds after the lock period expires
  - Early withdrawal with penalties
- **Transaction Tracking**
- **Error Handling Middleware**
- **GraphQL API with TypeGraphQL**
- **Custom Decorators for Cleaner Code**

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite (since it is a small scale project)
- **GraphQL:** Apollo Server, TypeGraphQL
- **Authentication:** JSON Web Tokens (JWT)
- **Middleware:** Custom decorators for authentication & error handling

## Getting Started

### Prerequisites
Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16 or later)
- [npm](https://yarnpkg.com/) or npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/adeoluwa/CashCove.git
   cd CashCove
   ```

2. Install dependencies:
   ```sh
   npm install  # or npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=4000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your_jwt_secret_key"
   ```
  - you can swap out the SQLite for other databases like PostgreSQL or MYSQL, just change it in the prisma.schema file

### Running the Application

#### Development
```sh
npm run dev  # Starts the development server
npm run dev:full  # Starts the development server and the prisma GUI
npm run prisma:generate # Generate the tables from the prisma schema
npm run prisma:migrate # Apply new changes to the database
npm run prisma:reset   # Reset the Database (hard reset, all data will be lost)
```

#### Production
```sh
npm run build  # Builds the project
npm run start  # Starts the production server
```

## API Usage

The GraphQL API is available at:
```
http://localhost:4000/graphql
```
Use GraphQL playground to explore the API schema and execute queries/mutations.

### Sample Queries & Mutations
#### Fund Wallet
```graphql
mutation {
  fundWallet(amount: 100, currency: "NGN")
}
```

#### Get Wallets
```graphql
query {
  getWallets {
    id
    balance
    currency
  }
}
```

## Folder Structure
```
CashCove/
│-- src/
│   │-- resolvers/          # GraphQL resolvers
|   |-- functions/          # Helper functions (probably should move this into utils)
|   |-- repositories/       # All database querys resides here
|   |-- loaders/            # Loads resolvers and register them in the index.ts
│   │-- services/           # Business logic
│   │-- schemas/            # GraphQL schemas
│   │-- middleware/         # Custom middleware (e.g., authentication)
│   │-- utils/              # Utility functions
│   │-- config/             # Configuration files
│   │-- types/              # Type definitions
│-- .env                    # Environment variables
│-- package.json            # Dependencies & scripts
│-- README.md               # Project documentation
```

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

---

### Contact
For any questions or suggestions, reach out to **Joseph Adeoluwa Odamo** at [kiishijoseph@gmail.com].

