# Web API

This is a web api built using nestJS that contains a single restful api that is responsible for login and signup. The second part of this api is a GraphQL api and this one is responsible for fetching and manipulating data.

## To run this project locally

- Clone it or download it on to your machine
- Install dependencies using `npm install`
- Start the development server by running 'npm run start:dev'
- This will spin up a server on `localhost:3000`
- Navigate to `localhost:3000` and send a post request to `/signup` to create a new user. Provide a `username, email, password` as josn in post body.
- Navigate to `localhost:3000` and send a post request to `/signin` to login. Provide a `email, password` as josn in post body.
- Navigate to `localhost:3000/graphql` to enter the graphQL interactive mode e.g explorer.

## Features

- A user can create a profile
- A user can login using a valid credentials
- ...

## How it looks like

### REST API

![Rest API screenshot](./screenshots/rest-api.png?raw=true 'Rest API screenshot')

### GRAPHQL API

![Graphql API screenshot](./screenshots/graphql-api.png?raw=true 'Graphql API screenshot')
