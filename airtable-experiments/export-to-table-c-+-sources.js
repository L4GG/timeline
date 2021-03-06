// @flow
const path = require('path');

const Airtable = require('airtable');
const env = require('node-env-file');
const { map, match, replace, test } = require('ramda');
const { isWebUri } = require('valid-url');

const events = require('./events.live.2018-01-01.json');
import type { Slide } from './utils/Slide';

env(path.join(__dirname, '../.env'));

const TIMELINE_TRIALS_BASE_ID = 'appMxfAV8EfhMa847';
const OLD_TIMELINE_HOST = 'http://timeline.lawyersforgoodgovernment.org';

const MONTHS = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'Jun',
  '7': 'Jul',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  TIMELINE_TRIALS_BASE_ID
);

const TableC = base('Table C');
const Sources = base('Sources');

const isBlockquote = test(/\<blockquote\>/);

events.forEach(({ start_date, text, media }: Slide) => {
  const isMediaEmpty = media.url === '';
  const isMediaBlockquote = isBlockquote(media.url);
  const isMediaWebUri = isWebUri(media.url);
  const isMediaImage = !(isMediaEmpty || isMediaBlockquote || isMediaWebUri);

  const sanitizeBlockquote = replace(/\<\/?blockquote\>/g, '');

  const [, body] = match(/<p>((?:.|\n)*?)<\/p>/, text.text);

  const sources: {| url: string, publication: string |}[] = map(tag => {
    const [, url, publication] = match(
      /<a href="(.*?)">Source: (.*?)<\/a>/,
      tag
    );
    return {
      publication,
      url,
    };
  }, match(/<a.*?>.*?<\/a>/g, text.text));

  TableC.create(
    {
      Headline: text.headline,
      Year: start_date.year,
      Month: start_date.month && MONTHS[start_date.month],
      Day: start_date.day,
      Body: body,
      Status: 'Live',
      'Media (URL)': isMediaWebUri ? media.url : undefined,
      'Media (Image)': isMediaImage
        ? [
            {
              url: `${OLD_TIMELINE_HOST}${media.url}`,
            },
          ]
        : undefined,
      'Media (Blockquote)': isMediaBlockquote
        ? sanitizeBlockquote(media.url)
        : undefined,
      'Media (Caption)': media.caption,
      'Media (Credit)': media.credit,
      // 'Source (Publication)': publication,
      // 'Source (URL)': url,
      // 'Source (Date)': undefined,
    },
    (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Event created:', record.getId());

      sources.forEach(({ publication, url }) => {
        Sources.create(
          {
            URL: url,
            Publication: publication,
            Event: [record.getId()],
          },
          (err, record) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Source created:', record.getId());
          }
        );
      });
    }
  );
});
