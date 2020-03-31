  <!-- Dependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate.svg" alt="Dependency Status" />
</a>
<!-- devDependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate#info=devDependencies">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate/dev-status.svg" alt="devDependency Status" />
</a>
<a href="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate.svg?branch=master" alt="Build Status" />
</a>
<a href="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json" style="max-width:100%;">
</a>

# CPAT Blog BFF (backend-for-frontend) 
The back end for a blogging web app to foster growth amongst the IBM CPAT team via the sharing of information. 

## Getting Started / Installation Instructions

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### 1. Clone this repo

```
$ git clone https://github.com/cpat-blog-team/cpat-blog-bff your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

## Development

### Start dev server

Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ npm run dev
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:3000`
- ⚙️**Swagger UI** at `http://localhost:3000/dev/api-docs`
- 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Packaging and Deployment

#### 1. Run with docker-compose

```
$ docker-compose up
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i -p 3000:3000 api-server
```

#### 3. Build and run

```
$ npm run build && npm run start
```

