// @flow
const fs = require('fs');
const AirTable = require('airtable');

const { AIRTABLE_API_KEY } = require('../secrets.json');
const transform = require('./utils/transform');
import type { Row } from './utils/Timeline';

type TimelineRowClass = {
  fields: Row,
};

export type Categories = { [id: string]: string };

// Configure Airtable Client
AirTable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});
const base = AirTable.base('appEi8v2EbXl6DFur');

// Get some data!

// get categories
// TODO: This relies on a race condition! Introduce async/await or re-organise this.
let categories: Categories = {};
base
  .table('Categories / Tags')
  .select({ fields: ['Category / Tag'] })
  .all()
  .then(json => {
    // transform category row classes to an object map
    categories = json.reduce(
      (acc, { id, fields }) =>
        Object.assign({}, acc, {
          [id]: fields['Category / Tag'],
        }),
      {}
    );
  });

// get timeline events
base
  .table('Timeline')
  .select({ view: 'Main View' })
  .all()
  .then(rows =>
    rows
      .map(({ fields }: TimelineRowClass) => fields)
      .filter((row: Row) => row.Status && row.Status.includes('Complete'))
      .sort((a: Row, b: Row) => a.Year - b.Year)
      .map((row: Row) => transform(row, categories))
  )
  .then(events => {
    fs.writeFileSync('./events.json', JSON.stringify(events, null, 4));
  });
