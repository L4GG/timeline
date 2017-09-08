const fs = require('fs');
const AirTable = require('airtable');

// extract api key
const env = fs.readFileSync('../.env');
const [, AIRTABLE_API_KEY] = String(env).match(
  /AIRTABLE_API_KEY=\s*(.*?)\s*\n/
);

// Configure Airtable Client
AirTable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});
const base = AirTable.base('appEi8v2EbXl6DFur');

// Get some data!

base
  .table('Timeline')
  .select({ view: 'Main View' })
  .firstPage()
  .then(rows => rows.map(row => row.fields))
  .then(console.log.bind(console));
