# Walmart challenge for full-stack developer
This repo is a solution to a Walmart (Chile) tech challenge to apply for a position as full-stack developer. Solution is built with Nodejs, TypeScript, and Mongoose in the backend. Frontend only uses Bootstrap CSS. Jest was used for testing. It comes bundled with Docker. The development environment uses `docker-compose` to start dependent services like mongo.

A few things to note in the project:
* **[Dockerfile](https://github.com/jacobparra/walmart-challenge/blob/master/Dockerfile)** - Dockerfile to generate docker builds.
* **[docker-compose](https://github.com/jacobparra/walmart-challenge/blob/master/docker-compose.yml)** - Docker compose script to start service in production mode.
* **[Containerized Mongo for development](#development)** - Starts a local mongo container with data persistence across runs.
* **[Mongo Connection Helper](https://github.com/jacobparra/walmart-challenge/blob/master/src/mongo-connection.ts)** - A helper class to connect to MongoDB reliably.
* **Joi** - For declarative payload validation
* **[Middleware for easier async/await](https://github.com/jacobparra/walmart-challenge/blob/master/src/middleware/request-middleware.ts)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
* **[Winston Logger](#logging)** - Uses winston as the logger for the application.
* **ESLINT** - ESLINT is configured for linting.
* **Jest** - Using Jest for running test cases

## Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.yml`.

```
$ docker-compose up
```
Running the above commands results in
* 🌏**Web Server** running at `http://localhost:3000`
* 🛢️**MongoDB** running at `mongodb://localhost:27017` (check credentials in `.env.default`)

## Packaging and Deployment
App is deployed in Heroku using its Docker container registry. Current link is https://walmart-challenge-jacobparra.herokuapp.com/. Mongo database is deployed with MongoDB Atlas cloud service https://www.mongodb.com/cloud/atlas as mLabs free tier in Heroku was deprecated.
#### 1. Login to Heroku using CLI

```
$ heroku login
$ heroku container:login
```
#### 2. Create new application if not exists

```
$ heroku create
```

#### 3. Build and deploy docker image

```
$ heroku container:push web
$ heroku container:release web
```
#### 4. Configure env vars in Heroku UI

It's important to setup `MONGO_URL` and `NODE_ENV` for application to function correctly.

---

## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.
