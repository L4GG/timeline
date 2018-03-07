// @flow
const path = require('path');

const Airtable = require('airtable');
const env = require('node-env-file');

const events = require('./events.live.2018-01-01.json');
import type { Slide } from './utils/Slide';

env(path.join(__dirname, '../.env'));

const TIMELINE_TRIALS_BASE_ID = 'appMxfAV8EfhMa847';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  TIMELINE_TRIALS_BASE_ID
);

const TableA = base('Table A');

events.forEach(({ start_date, text, media }: Slide) => {
  TableA.create(
    {
      Text: text.text,
      Year: start_date.year,
      Month: start_date.month,
      Day: start_date.day,
      Headline: text.headline,
      'Media (URL)': media.url,
      'Media (Caption)': media.caption,
      'Media (Credit)': media.credit,
    },
    (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    }
  );
});
