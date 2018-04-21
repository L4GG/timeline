# L4GG Timeline
Microsite to display events compiled by Lawyers for Good Government Volunteers.

[![Build Status](https://travis-ci.org/L4GG/timeline.svg?branch=master)](https://travis-ci.org/L4GG/timeline)

## Getting Started

Create a .env file
```
cp sample.env .env
```

Install dependencies
```
yarn install
```

Start the dev server
```
yarn start
```

Open [localhost:3000](http://localhost:3000)

## Connecting to real Event data

In `.env`, fill in `AIRTABLE_API_KEY` with a key that has access to the **RG
Timeline for Updates** Airtable base.

Compile the client
```
yarn build
```

Launch the server process
```
yarn prod
```

## Creating an Event

Events are hosted on [Airtable](https://airtable.com/).  Contact the L4GG team
for access and direction on the maintenance process.

## Testing

Run all unit and integration tests:
```
yarn test
```

Run unit tests on file changes (you'll need to restart if there are failures):
```
yarn test:watch
```

Run only unit tests:
```
yarn test:unit
```

Run only integration tests:
```
yarn test:integration
```
