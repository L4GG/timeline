// @flow
const Case = require('case');

import type { Row } from './Timeline';
import type { Slide } from './Slide';

import type { Categories } from '../airtable-api-test';

const MONTHS = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  June: 6,
  July: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function transform(row: Row, categories: Categories): Slide {
  const date = new Date(row.Date);

  const getMedia = (row: Row): string => {
    const mediaImage = row['Media Image'];
    if (mediaImage && mediaImage.length > 0) {
      // console.log(row['Title (fact or allegation)']);
      if (!mediaImage[0].type.includes('image')) return '';
      return mediaImage[0].thumbnails.large.url;
    }
    if (row['Media Link']) {
      return row['Media Link'];
    }
    if (row['Media Blockquote']) {
      return `<blockquote>\n${row['Media Blockquote']}\n</blockquote>`;
    }
    return '';
  };

  return {
    start_date: {
      day: row.Day || date.getDate(),
      month: MONTHS[row.Month] || date.getMonth() + 1,
      year: row.Year || date.getFullYear(),
      display_date: null,
    },
    text: {
      headline: row['Title (fact or allegation)'],
      // TODO: `target="_blank"`?
      text: `<p>\n${row[
        'Description (fact or allegation)'
      ]}\n</p>\n<a href="${row['Source (URL)']}">Source: ${row[
        'Source (Publication)'
      ]}</a>`,
    },
    media: {
      url: getMedia(row),
      caption: row['Media Caption'] || '',
      credit: row['Media Credit'] || '',
      thumbnail: null,
    },
    tags: (row['Categories / Tags'] || [])
      .map(id => Case.constant(categories[id])),
    background: {},
    unique_id: Case.kebab(`${row.Year}-${row['Title (fact or allegation)']}`),
  };
}

module.exports = transform;
