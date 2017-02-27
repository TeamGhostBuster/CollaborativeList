# Installation

## Requirements
* [Docker](https://www.docker.com/products/overview)
* [Docker Compose](https://docs.docker.com/compose/)

## Steps
1. Clone our project from Github.  
`$ git clone https://github.com/TeamGhostBuster/restful-api.git`  
`$ git clone https://github.com/TeamGhostBuster/CollaborativeList.git`

2. For the `restful-api`, if you run into any error, just try to restart the container that fails.   
`$ docker-compose up -d`

3. For the `CollaborativeList`, it can be accessed through `http://localhost:3000` by default.  
`$ docker-compose up -d`


## Configuration
* Modify the `docker-compose.yml` file under the `CollaborativeList` folder, set `GOOGLE_CLIENT_ID` environment variable to the one you obtain from Google Developer Console.
* Modify the `docker-compose.yml` file under the `CollaborativeList` folder, set `API_URL` environment able to the host where you are running the `restful-api`.
