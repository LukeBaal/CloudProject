# Cloud Project

Concensus Management using a Hyperledger Fabric blockchain

## Dependencies

- Docker
- Docker-compose
- Node 8.x \*

\* NOTE: MUST be Node 8.x to work with hyperledger. NVM (Node version manager) can be used to allow use of Node 8.x

It is recodmendded to run this project on Mac/Linux, due to the need for Docker and the included statup script. Windows users should be able to run the commands in `startup.sh` using Git Bash.

## Install

Hyperledger Composer CLI Dependencies ()

```
npm install -g composer-cli composer-rest-server generator-hyperledger-composer
```

```
./startup.sh
docker-compose build
docker-compose up
```

## Troubleshooting

### Hyperledger

If issues using hyperledger, refer to the documentation.

Hyperledger Fabric:
https://hyperledger-fabric.readthedocs.io/en/latest/

Hyperledger Composer:
https://hyperledger.github.io/composer/latest/installing/installing-index.html

### Composer API

If actions such as users adding/editting permissions or companies adding their info are hanging (Button says "Sending...."), then it is likely an issue with the Composer REST API. More specifically, it seems the GRPC connection timesout if the network is running long enough without any requests.

Solution: run `startup.sh` again to restart the network.

### Manual Install (Alternative to docker install)

```
git clone https://github.com/lukebaal/CloudProject.git
```

NOTE: The following commands can be run from the project root directory

```
npm --prefix ./backend install
npm --prefix ./frontend install
npm --prefix ./frontend run build
```

This will install the dependencies for the backend/frontend and build the frontend

## Run

In one terminal

```
./startup.sh
```

This will startup the Hyperledger network and start the Composer REST API

In another terminal

```
cd backend
NODE_ENV=production npm start
```

This will start the backend in production, which servers the frontend

Navigate to `localhost:5000` to access the frontend
