# Installation

## Requirements
* [Docker](https://www.docker.com/products/overview)
* [Docker Compose](https://docs.docker.com/compose/)
* Any operation system that can run Docker on it.

## Notes
* Since we expect you to be a experienced Linux server user, this documentation will not cover anything about how to setup a Linux server, how to install packages on a Linux server, etc.
* For installation of Docker please refer to the [Docker documentation](https://store.docker.com/editions/community/docker-ce-server-ubuntu?tab=description)
* We recommend the use of NGINX as a reverse proxy server and to enable the `HTTPS` for security purposes. You may obtain a free SSL certificate from [Let's Encrypt](https://letsencrypt.org/). For further instruction, please refer to the [NGINX documentation](https://www.nginx.com/resources/admin-guide/reverse-proxy/).
* We only support installation via Docker.
* More custom configuration please refer to the `config.py` file under the `app` directory.
* For experimental features please refer to the `push_notification` branch under the [repo](https://github.com/TeamGhostBuster/CollaborativeList). And check out [demo-dev.vfree.org](https://demo-dev.vfree.org)

## Steps
1. Clone our project from Github.  
`$ git clone https://github.com/TeamGhostBuster/restful-api.git`  
`$ git clone https://github.com/TeamGhostBuster/CollaborativeList.git`

2. For the backend API, if you run into any error, just try to restart the container that fails.  
`$ cd restful-api`   
`$ docker-compose up -d`

3. For the frontend web app, it can be accessed through `http://localhost:3000` by default.     
`$ cd CollaborativeList`  
`$ ./build.sh`

## Configuration
1. Modify the `docker-compose.yml` file under the `CollaborativeList` folder and set the `GOOGLE_CLIENT_ID` environment variable to the one you obtain from Google Developer Console.
    * Go to the [Google Developer Console](console.developers.google.com/) to obtain an OAuth client ID. For further instruction, please refer to Google's official documentation.
    * Setup your domain name at the Google Developer Console, since google does not allow addresses like `localhost` or `127.0.0.1` to use its service.
2. Modify the `docker-compose.yml` file under the `CollaborativeList` folder, set `API_URL` environment variable to the host where you are running the `restful-api`.

## Docker image overview
* flaskapp - The universal backend API
* raspberry - The frontend React app
* mongo - A cluster of MongoDB instances
* elastic - The ElasticSearch to provide search feature to the React app

# Development
Since we are using the RESTful architecture for this system, it is possible to integrate a multitude of different client-side software with the existing API.

## Front-end
The front end is built with [React](https://facebook.github.io/react/), making it easy to customize the UI components, theme, or virtually anything else to fit your personal needs. For detailed development environment setup instructions, please refer to the `README.md` file under our [Github repository](https://github.com/TeamGhostBuster/CollaborativeList).

## Back-end
The back end is build with Flask, MongoDB, and ElasticSearch. Since Flask is a relatively lightweight web framework, you may develop new features and customize existing ones easily. Our development environment comes with the Docker image as well. For setup instructions, please refer to our [Github repository](https://github.com/TeamGhostBuster/restful-api).

## Useful Links
* [Docker Documentations](https://docs.docker.com/)
* [Flask Documentations](http://flask.pocoo.org/docs/0.11/)
