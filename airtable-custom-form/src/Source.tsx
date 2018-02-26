import { Button, DatePicker, Form, Input } from 'antd';
import { Moment } from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import { formLayout } from './App';

export interface SourceFields {
  url: string;
  publication: string;
  date: Moment;
}

interface Props {
  id: number;
  onChange: (fields: SourceFields) => void;
  onRemove: () => void;
  source: SourceFields;
}

const { Item } = Form;

const SubsectionHeading = styled.h3`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

const Source = ({ id, onChange, onRemove, source }: Props) => (
  <React.Fragment>
    <SubsectionHeading>
      Source {id}{' '}
      <Button size="small" type="danger" onClick={onRemove}>
        Remove
      </Button>
    </SubsectionHeading>
    <Item {...formLayout} label="URL">
      <Input
        value={source.url}
        onChange={e => {
          const url = e.target.value;
          onChange({
            ...source,
            url,
          });
        }}
      />
    </Item>
    <Item {...formLayout} label="Publication">
      <Input
        value={source.publication}
        onChange={e => {
          const publication = e.target.value;
          onChange({
            ...source,
            publication,
          });
        }}
      />
    </Item>
    <Item {...formLayout} label="Date">
      <DatePicker
        value={source.date}
        onChange={value => {
          onChange({ ...source, date: value });
        }}
      />
    </Item>
  </React.Fragment>
);

export default Source;
