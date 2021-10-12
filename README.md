# gofor.games API

> Full stack MERN application built for members to host and manage their events. 

This is a Node/Express/MongoDB REST API that applies Clean Architecture and Design Pattern for building scalable and maintainable application. The application also ulitilizes Mailgun for mailing services and Auth0 for authentication. The application can be found [here](https://verify-students-frontend.herokuapp.com/)


# Usage

## Build and Manage Apps with Auth0

Quickstart and more tutorials can be found [here](https://auth0.com/docs/quickstart/backend/nodejs)

## Environment variables

Create a .env file in the root folder and copy the following values

```bash
ADMINLIST=[userId]
API_IDENTIFIER=Your API Identifier
CLIENT_ID=Your Client ID
CLIENT_SECRET=Your Client Secret
DOMAIN=Auth0 Domain
MAILGUN_API=Your Mailgun API
MAILGUN_DOMAIN=Your Mailgun Domain
MONGO_URL=Your MongoURL

```

## Install Dependencies

```bash
npm install
npm start  # Node :5000
```
