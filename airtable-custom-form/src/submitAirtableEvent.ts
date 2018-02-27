// tslint:disable:no-any no-console
import Airtable from 'airtable';

import { Fields, MediaType } from './App';

const TIMELINE_TRIALS_BASE_ID = 'appMxfAV8EfhMa847';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(TIMELINE_TRIALS_BASE_ID);

const TableC = base('Table C');
const Sources = base('Sources');

const submitAirtableEvent = ({ event, media, sources }: Fields) => {
  return new Promise((resolve, reject) => {
    TableC.create(
      {
        Headline: event.headline,
        Year: event.year,
        Month: event.month,
        Day: event.day,
        Body: event.body,
        Status: 'Needs Review',
        'Media (URL)': media.type === MediaType.URL ? media.url : undefined,
        'Media (Image)':
          media.type === MediaType.Image ? media.image : undefined,
        'Media (Blockquote)':
          media.type === MediaType.Quote ? media.quote : undefined,
        'Media (Caption)': media.caption,
        'Media (Credit)': media.credit,
      },
      (err: Error, record: any) => {
        if (err) {
          console.error(err);
          return reject(err);
        }

        console.log('Event created:', record.getId());

        sources.forEach(({ publication, url, date }) => {
          Sources.create(
            {
              URL: url,
              Publication: publication,
              Date: date.format('YYYY-MM-DD'),
              Event: [record.getId()],
            },
            (sourceErr: Error, sourceRecord: any) => {
              if (err) {
                console.error(sourceErr);
                return reject(sourceErr);
              }

              console.log('Source created:', sourceRecord.getId());
            },
          );
        });
      },
    );
  });
};

export default submitAirtableEvent;
