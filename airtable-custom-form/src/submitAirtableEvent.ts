// tslint:disable:no-any no-console
import Airtable from 'airtable';

import { Fields, MediaType } from './App';
import syncFileToS3 from './syncFileToS3';

const TIMELINE_TRIALS_BASE_ID = 'appnQs29Fzl3tWohJ';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(TIMELINE_TRIALS_BASE_ID);

const TableC = base('Timeline');
const Sources = base('Sources');

const submitAirtableEvent = async ({ event, media, sources }: Fields) => {
  // Sync image to S3, if necessary.
  let imageUrl: string = '';
  if (media.type === MediaType.Image && media.image != null) {
    imageUrl = await syncFileToS3(media.image);
  }

  console.log('imageUrl', imageUrl);

  // Submit full event data to AirTable
  return await new Promise((resolve, reject) => {
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
          media.type === MediaType.Image ? [{ url: imageUrl }] : undefined,
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

        Promise.all(
          sources.map(({ publication, url, date }) => {
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
                  return Promise.reject(sourceErr);
                }

                console.log('Source created:', sourceRecord.getId());

                return Promise.resolve();
              },
            );
          }),
        ).then(resolve);
      },
    );
  });
};

export default submitAirtableEvent;
