// @flow
export type Slide = {|
  start_date: {|
    day?: ?number,
    month?: ?number,
    year: number,
    display_date: ?number,
  |},
  text: {|
    headline: string,
    text: string,
  |},
  media: {|
    url: string,
    caption: string,
    credit: string,
    thumbnail: null,
  |},
  tags: string[],
  background: {||},
  unique_id: string,
|};
