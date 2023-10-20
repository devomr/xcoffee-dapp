## xCoffee dApp

The xCoffee dApp is based on the [mx-template-dapp](https://www.npmjs.com/package/@multiversx/mx-template-dapp) and is built using [React.js](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).

The users can use the dApp to interact directly with the smart contract or with the backend microservice.

The interaction with the smart contract is by sending the transactions: donate, create_user_subscription and cancel_subscription

The interaction with the microservice is by getting the donate transactions for a creator,
get and save the creator profile details in off-chain database (MongoDB), get the most recent registered creators and get the subscription deadline for an user.

## Requirements

- Node.js version 16.20.0+
- Npm version 8.19.4+

## Getting Started

The dapp is a client side only project and is built using the [Create React App](https://create-react-app.dev) scripts.

### Instalation and running

### Step 1. Install modules

From a terminal, navigate to the project folder and run:

```bash
npm install
```

### Step 2. Running in development mode

In the project folder run:

```bash
npm run start:devnet
npm run start:testnet
npm run start:mainnet
```

This will start the React app in development mode, using the configs found in the `vite.config.ts` file.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Step 3. Build for testing and production use

A build of the app is necessary to deploy for testing purposes or for production use.
To build the project run:

```bash
npm run build:devnet
npm run build:testnet
npm run build:mainnet
```
