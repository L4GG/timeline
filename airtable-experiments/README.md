# Airtable Experiments

This folder contains a loose collection of scripts which perform useful
functions against the Airtable API.

## events.json

`events.*.json` files are copy-pasted exports pulled from `/dist/`, after
building the root package with `npm run build`.

## Scripts

### Authentication

You will need an API key associated to an Airtable account that has access to
the table(s) you are trying to interact with.  This can be found in your
Airtable account settings.

Add this key to `/.env` in the root of this project (see: `/sample.env`).

### Usage

The remaining scripts in this folder are intended to be run directly in node.

```
$ node ./export-to-table-a.js
```

Several of these scripts do rely on ES syntax features which are not available
in the current version of `node`.  For this reason, I recommend running with
babel-node, instead.

```
$ ../node_modules/.bin/babel-node ./export-to-table-a.js
```
