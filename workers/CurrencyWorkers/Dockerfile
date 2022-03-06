FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install forever for long running script
RUN npm install forever -g

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY AccountsCurrencySubscriberWorker/package*.json ./AccountsCurrencySubscriberWorker/
COPY CurrencyPublisherWorker/package*.json ./CurrencyPublisherWorker/
COPY TransactionCurrencySubscriberWorker/package*.json ./TransactionCurrencySubscriberWorker/

WORKDIR /usr/src/app/AccountsCurrencySubscriberWorker
RUN npm install

WORKDIR /usr/src/app/CurrencyPublisherWorker
RUN npm install

WORKDIR /usr/src/app/TransactionCurrencySubscriberWorker
RUN npm install

# Bundle app source
WORKDIR /usr/src/app
COPY . .

# RUN forever start ./AccountsCurrencySubscriberWorker/index.js && forever start ./CurrencyPublisherWorker/index.js && forever start ./TransactionCurrencySubscriberWorker/index.js

CMD forever ./forever.json