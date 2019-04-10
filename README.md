# Cloud Project

Concensus Management using a Hyperledger Fabric blockchain

## Dependencies

- Docker
- Docker-compose
- Node 8.x

NOTE: MUST be Node 8.x to work with hyperledger. NVM (Node version manager) can be used to allow use of Node 8.x if a different version of node is already installed.

Mac/Linux may be required to run the scripts included with hyperledger, although it is possible Git Bash may allow for running on Windows

## Install

```
git clone https://github.com/lukebaal/CloudProject.git
```

### Hyperledger Composer CLI Dependencies

```
npm install -g composer-cli composer-rest-server
```

### Generate Admin Credentials

```
cd hyperledger
./createPeerAdminCard.sh
```

### Compile hyperledger network

```
cd consensus-network
composer archive create -t dir -n .
```

### Install backend/frontend dependencies and build frontend

NOTE: The `cd` command below assumes you are in `hyperledger/consensus-network` directory from previous steps

```
cd ../../
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
docker-compose up
```

This will start the database container

In another terminal

```
cd backend
NODE_ENV=production npm start
```

This will start the backend in production, which serves the frontend

Navigate to `localhost:5000` in a browser to access the application

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

