// @flow
type Attachment = {
  id: string,
  url: string,
  filename: string,
  size: number, // bytes
  type: string, // content type
  width: number,
  height: number,
  thumbnails: {
    small: {
      url: string,
      width: number,
      height: number,
    },
    large: {
      url: string,
      width: number,
      height: number,
    },
  },
};

type Collaborator = 'DD' | 'JL' | 'JW' | 'AM' | 'JS' | 'CS' | 'ABC' | 'Ansel';

type Status =
  | 'Ready to Work'
  | 'In Progress'
  | 'Ready for Timeline'
  | 'Complete (Added to Timeline)'
  | "Closed (Won't Add)"
  | 'Closed (Duplicate)'
  | 'Ready to Commit'
  | 'Pull Request Submitted'
  | 'Review by Jacob LeGrone Requested'
  | 'Questions befor Committing'
  | '';

export type Row = {
  'Row ID': number,
  'Description (fact or allegation)': string,
  'Media Image'?: Attachment[],
  Year: number,
  'Source (URL)': string,
  Notes: string,
  'Relevance (test / do not update)'?: string,
  'Categories / Tags'?: string[],
  'Created by': Collaborator,
  'Source (Date)': string,
  Month: string,
  Date: string,
  Day?: number,
  Status?: Status,
  'Source (Publication)': string,
  'Title (fact or allegation)': string,
  'Media Credit'?: string,
  'Media Link'?: string,
  'Media Blockquote'?: string,
  'Media Caption'?: string,
  'Launch Priority'?: string,
  'Row Updated'?: Collaborator,
  'Final Review Complete'?: Collaborator,
  Assignee?: Collaborator,
};
