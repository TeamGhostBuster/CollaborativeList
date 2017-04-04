# Installation

## Requirements
* [Docker](https://www.docker.com/products/overview)
* [Docker Compose](https://docs.docker.com/compose/)

## Notes
* Since we expect you to be a experienced Linux server user, this documentation will not cover anything about how to setup a Linux server, how to install packages on a Linux server, etc.
* For installation of Docker please refer to the [Docker documentation](https://store.docker.com/editions/community/docker-ce-server-ubuntu?tab=description)
* We recommend the use of NGINX as a reverse proxy server for the application, and to setup the SSL certification for security purposes. For further instruction, please refer to the [NGINX documentation](https://www.nginx.com/resources/admin-guide/reverse-proxy/).
* We only support installation via Docker.

## Steps
1. Clone our project from Github.  
`$ git clone https://github.com/TeamGhostBuster/restful-api.git`  
`$ git clone https://github.com/TeamGhostBuster/CollaborativeList.git`

2. For the `restful-api` backend, if you run into any errors, you can usually resolve them by restarting the container that fails.     
`$ docker-compose up -d`

3. The `CollaborativeList` frontend can be accessed through `http://localhost:3000` by default.   
`$ ./build.sh`

## Configuration
1. Modify the `docker-compose.yml` file under the `CollaborativeList` folder and set the `GOOGLE_CLIENT_ID` environment variable to the one you obtain from Google Developer Console.
    * Go to the [Google Developer Console](console.developers.google.com/) to obtain an OAuth client ID. For further instruction, please refer to Google's official documentation.
    * Setup your domain name at the Google Developer Console, since google does not allow addresses like `localhost` or `127.0.0.1` to use its service.
2. Modify the `docker-compose.yml` file under the `CollaborativeList` folder, set `API_URL` environment variable to the host where you are running the `restful-api`.

# Development
Since we are using the RESTful architecture for this system, it is possible to integrate a multitude of different client-side software with the existing API.

## Front-end
The front end is built with [React](https://facebook.github.io/react/), making it easy to customize the UI components, theme, or virtually anything else to fit your personal needs. For detailed development environment setup instructions, please refer to the `README.md` file under our [Github repository](https://github.com/TeamGhostBuster/CollaborativeList).

## Back-end
The back end is build with Flask, MongoDB, and Elasticsearch. Since Flask is a relatively lightweight web framework, you may develop new features and customize existing ones easily. Our development environment comes with the Docker image as well. For setup instructions, please refer to our [Github repository](https://github.com/TeamGhostBuster/restful-api).
