const AirTable = require('airtable');
const dotEnv = require('dotenv');

const MONTHS = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes in milliseconds

dotEnv.config();

AirTable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = AirTable.base('appnQs29Fzl3tWohJ');

const cache = {
  events: null,
  lastUpdated: Date.now(),
  updatePending: false,
};

/**
 * Event data is hosted on AirTable. this function attempts to both fetch and
 * collate it into the format expected by TimelineJS3.
 *
 * @returns {Promise} Event data, formatted for TimelineJS3
 */
function fetchEvents() {
  console.log('fetchEvents:start');
  let sources;

  return (
    base
      // Fetch all sources
      .table('Sources')
      .select({ view: 'Grid view' })
      .all()
      // Cache sources by id
      .then(rows => {
        sources = rows.reduce(
          (acc, { id, fields }) => Object.assign({}, acc, { [id]: fields }),
          {},
        );
        return;
      })
      // Fetch all timeline events
      .then(() =>
        base
          .table('Timeline')
          .select({ view: 'Grid view' })
          .all(),
      )
      .then(rows => {
        console.log('fetchEvents:end');
        return rows;
      })
      // Transform sources and events to slide JSON
      .then(rows =>
        rows
          .map(({ fields }) => fields)
          .filter(
            row =>
              process.env.NODE_ENV === 'production'
                ? row.Status === 'Live'
                : row.Status === 'Live' || row.Status === 'Staged',
          )
          .sort((a, b) => a.Year - b.Year)
          .map(row => ({
            start_date: {
              day: row.Day,
              month: MONTHS[row.Month],
              year: row.Year,
              display_date: null,
            },
            text: {
              headline: row.Headline,
              text: [
                `<p>${row.Body || ''}</p>`,
                ...row.Sources.map(
                  sourceId =>
                    `<a href="${sources[sourceId].URL}">Source: ${sources[
                      sourceId
                    ].Publication}</a>`,
                ),
              ].join('\n'),
            },
            media: {
              url:
                row['Media (URL)'] ||
                (row['Media (Image)']
                  ? row['Media (Image)'][0].thumbnails.large.url
                  : ''),
              caption: row['Media (Caption)'] || '',
              credit: row['Media (Credit)'] || '',
              thumbnail: null,
            },
            tags: [],
            background: {},
            unique_id: row.ID,
          })),
      )
  );
}

/**
 * Update the event cache, asynchronously.  Resolves with the new data, once
 * updated.
 *
 * @returns {Promise} Event data, formatted for TimelineJS3
 */
function updateEventCache() {
  cache.updatePending = true;

  return fetchEvents().then(events => {
    cache.events = events;
    cache.lastUpdated = Date.now();
    cache.updatePending = false;

    return events;
  });
}

/**
 * It's expensive (and slow) to fetch events to service every request.
 * Instead, this wrapper function attempts to load events from a cache first,
 * triggering a request in the background, if the contents appear stale.
 *
 * @returns {Promise} Event data, formatted for TimelineJS3
 */
function fetchEventsWithCache() {
  // If cache is stale, trigger an async update (but don't block on it).
  if (
    !cache.updatePending &&
    Date.now() - cache.lastUpdated >= CACHE_EXPIRATION
  ) {
    updateEventCache();
  }

  // If we have cached data, return it.
  if (cache.events != null) {
    return Promise.resolve(cache.events);
  }

  // If we have never cached data yet, fetch and block on the result.
  return updateEventCache();
}

module.exports = fetchEventsWithCache;
