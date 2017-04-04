# Installation

## Requirements
* [Docker](https://www.docker.com/products/overview)
* [Docker Compose](https://docs.docker.com/compose/)
* Any operation system that can run Docker on it.

## Notes
* We expect you are a experienced Linux server user, this documentation will not cover anything about how to setup a Linux server, how to install package on Linux server, etc.
* Installation of docker please refer to [Docker documentations](https://store.docker.com/editions/community/docker-ce-server-ubuntu?tab=description)
* We recommandate to use Nginx as reverse proxy server to serve this application, and setup the SSL certification for security purposes. For futhur instruction, please refer to its [Nginx documentations](https://www.nginx.com/resources/admin-guide/reverse-proxy/).
* We only supports the installation with Docker.

## Steps
1. Clone our project from Github.  
`$ git clone https://github.com/TeamGhostBuster/restful-api.git`  
`$ git clone https://github.com/TeamGhostBuster/CollaborativeList.git`

2. For the backend API, if you run into any error, just try to restart the container that fails.  
`$ cd restful-api`   
`$ docker-compose up -d`

3. For the `CollaborativeList`, it can be accessed through `http://localhost:3000` by default.     
`$ cd CollaborativeList`  
`$ ./build.sh`

## Configuration
* Modify the `docker-compose.yml` file under the `CollaborativeList` folder, set `GOOGLE_CLIENT_ID` environment variable to the one you obtain from Google Developer Console.
    * Go to the [Google Developer Console](console.developers.google.com/) to obatin a Oauth client ID. For furthur instruction, please refer to Google's official documents.
    * Setup your domain name at the Google Developer Console, since google does not allow address like `localhost` or `127.0.0.1` to use its service.
* Modify the `docker-compose.yml` file under the `CollaborativeList` folder, set `API_URL` environment able to the host where you are running the `restful-api`.

## Docker image overviewe
* flaskapp - The universal backend API
* raspberry - The frontend React app
* mongo - A cluster of MongoDB instances
* elastic - The elasticsearch to provide search feature to the React app

# Development
We are ussing the REST archtiture for this system, it is possible to develop any clients side software with the existed API.

## Front-end
The front end is built with [React](https://facebook.github.io/react/), it is easy to customize the component, theme, or any other thing to fit your personal need. For detail development environment setup instruction, please refer to the `README.md` file under our [Github repoistory](https://github.com/TeamGhostBuster/CollaborativeList).

## Back-end
The back end is build with Flask, MongoDB, and elasticsearch. Since Flask is a really light wight web framework, you may develop any new feature easily. Our development environment comes with the Docker image as well, for setup instruction, please refer to [Github repo](https://github.com/TeamGhostBuster/restful-api).
