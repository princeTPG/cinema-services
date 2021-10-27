# Node Js Learning

## Installation

- Install NodeJS, MongoDB
- Install `npm` or `yarn`
- Start MongoDB or we can use docker `docker-compose -f docker-compose.yaml up` to start mongo-db server in docker.
- Run `yarn dev` / `yarn start:dev` to run normal server
- Create a `.env.prod` and prod env info as given in `.env.dev` and  Run `yarn start:prod` to run server with `prod` env
- Check `http://localhost:3000/status` to see if server works
- open `http://localhost:3000/` in browser to run template


## Test cases
 Here in this POC, we implemented test-cases using Mocha and chai. We only write cases for theater-apis.
 To run the test cases, we first need to run mongo using docker by running

  - `docker-compose -f docker-compose.yaml up`
  - then run `yarn test`


## Postman collection
Anyone can access the postman collection and fork it in your POSTMAN workspace, then test the apis for cinema-serices.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4967792-ac585b55-3455-4cf6-a2c0-d162546c2fb5?action=collection%2Ffork&collection-url=entityId%3D4967792-ac585b55-3455-4cf6-a2c0-d162546c2fb5%26entityType%3Dcollection%26workspaceId%3Df39864d5-ebb6-4d09-9ee8-403117cef4ee)