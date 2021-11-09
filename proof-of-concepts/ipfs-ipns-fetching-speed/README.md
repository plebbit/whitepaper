# Plebbit POC

## Description

Plebbit is a theoretical design for a Reddit alternative built partly using IPFS/IPNS. View the [whitepaper](https://github.com/plebbit/whitepaper/discussions/2).

One of the design that needs to be tested and benchmarked is how long it would take for a user to fetch a Plebbit page (with all its IPFS/IPNS content) client side.

Multiple scenarios should be tested:

1. A front page for a user subscribed to 100 subplebbits with 100 posts each.
2. A subplebbit front page with 100 posts, with new posts (a new IPNS record) published every X minutes.
3. A subplebbit post with all replies, with new replies (a new IPNS record) published every X minutes.

## Features

This PoC have:
- An API use to interact with plebbit (The doc can be found in the get route api-docs)
- Two scripts running every hour that will publish the new IPNS record to update the posts and subplebbits
- A front-end serverless done in ReactJS recreating the cases for the PoC
- Three different scripts helping creating the dataset used for the PoC in Python and nodejs

## Installation

To install this project, you're going to need [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/get-npm), [MariaDB](https://mariadb.org/download) and [IPFS-GO](https://github.com/ipfs/go-ipfs)

You need to execute the command bellow inside client and api directories

    npm install

Then you can launch the ipfs node with:

    ipfs daemon

Next you need to apply the SQL schema to mariadb inside the the api directory:

    cat schema.sql | mysql -u USER -p

And finally launch the API and the Client using the command bellow inside both of the api and client directories:

    npm start

Or you can simply use the docker-compose by this command:

    docker-compose up

## Environnement

- __`IPFS_API`__      Define the __API__ of the IPFS __Node__ used
- __`IPFS_GATEWAY`__      Define the __Gateway__ used by __IPFS__
- __`API_PORT`__      Define the __Port__ of the __API__
- __`MYSQL_DATABASE`__      Define the __Name__ of the __Database__
- __`MYSQL_USER`__      Define the __User__ of the __Database__
- __`MYSQL_PASS`__      Define the __Password__ of the __Database__
- __`MYSQL_ROOT_PASSWORD`__      Define the __Password__ of the __Root__ user from the __Database__
- __`MYSQL_HOST`__      Define the __Host__ of the __Database__
- __`MYSQL_PORT`__      Define the __Port__ of the __Database__

## Dependencies

- __[axios](https://www.npmjs.com/package/axios)__
- __[dotenv](https://www.npmjs.com/package/dotenv)__
- __[body-parser](https://www.npmjs.com/package/body-parser)__
- __[express](https://www.npmjs.com/package/express)__
- __[ipfs-core](https://www.npmjs.com/package/ipfs-core)__
- __[morgan](https://www.npmjs.com/package/morgan)__
- __[mysql2-async](https://www.npmjs.com/package/mysql2-async)__
- __[node-cron](https://www.npmjs.com/package/node-cron)__
- __[nodemon](https://www.npmjs.com/package/nodemon)__
- __[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)__
- __[yamljs](https://www.npmjs.com/package/yamljs)__
- __[p-queue](https://www.npmjs.com/package/p-queue)__
- __[ReactJS](https://en.reactjs.org/)


## Author
 - __[lolboysg](https://github.com/lolboysg)__