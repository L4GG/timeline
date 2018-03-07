// tslint:disable:no-console
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  Upload,
  Row,
  Select,
  Tabs,
} from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import Source, { SourceFields } from './Source';
import submitAirtableEvent from './submitAirtableEvent';

export enum MediaType {
  URL = 'URL',
  Image = 'Image',
  Quote = 'Quote',
}

enum Months {
  Jan = 'Jan',
  Feb = 'Feb',
  Mar = 'Mar',
  Apr = 'Apr',
  May = 'May',
  Jun = 'Jun',
  Jul = 'Jul',
  Aug = 'Aug',
  Sep = 'Sep',
  Oct = 'Oct',
  Nov = 'Nov',
  Dec = 'Dec',
}

export interface Fields {
  event: {
    year: number;
    month: Months | void;
    day: number | void;
    headline: string;
    body: string;
  };
  media: {
    type: MediaType;
    url: string;
    image: string | void;
    quote: string;
    caption: string;
    credit: string;
  };
  sources: SourceFields[];
}

const { Content, Header } = Layout;
const { Dragger } = Upload;
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const CONTENT_WIDTH = 780;
const GUTTER_SIZE = 30;

const SectionHeading = styled.h2`
  border-bottom: solid 1px #ddd;
`;

const Title = styled.h1`
  color: white;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${CONTENT_WIDTH}px;
  padding: 0 ${GUTTER_SIZE}px;
`;

export const formLayout = {
  colon: false,
};

const initialState = {
  event: {
    year: 1900,
    month: undefined,
    day: undefined,
    headline: '',
    body: '',
  },
  media: {
    type: MediaType.URL,
    url: '',
    image: undefined,
    quote: '',
    caption: '',
    credit: '',
  },
  sources: [],
};

class App extends React.Component<{}, Fields> {
  state = initialState;

  submitEvent = () => {
    submitAirtableEvent(this.state)
      .then(() => {
        window.alert('Event successfully submitted!');
        this.setState(() => initialState);
      })
      .catch(err => {
        console.error(err);
        window.alert(err);
      });
    // tslint:disable
  };

  render() {
    const { event, media, sources } = this.state;

    return (
      <Layout>
        <Header>
          <Wrapper>
            <Title>L4GG Timeline — Submit New Event</Title>
          </Wrapper>
        </Header>
        <Content>
          <Wrapper
            style={{ paddingTop: GUTTER_SIZE, paddingBottom: GUTTER_SIZE }}
          >
            <Form>
              <SectionHeading>Event</SectionHeading>
              <Row>
                <Col xs={6} sm={3}>
                  <Item {...formLayout} label="Year">
                    <InputNumber
                      value={event.year}
                      onChange={(value: number) => {
                        this.setState(state => ({
                          event: { ...state.event, year: value },
                        }));
                      }}
                    />
                  </Item>
                </Col>
                <Col xs={6} sm={3}>
                  <Item {...formLayout} label="Month">
                    <Select
                      value={event.month}
                      onChange={(value: Months) => {
                        this.setState(state => ({
                          event: { ...state.event, month: value },
                        }));
                      }}
                    >
                      <Option value={undefined}>—</Option>
                      <Option value={Months.Jan}>{Months.Jan}</Option>
                      <Option value={Months.Feb}>{Months.Feb}</Option>
                      <Option value={Months.Mar}>{Months.Mar}</Option>
                      <Option value={Months.Apr}>{Months.Apr}</Option>
                      <Option value={Months.May}>{Months.May}</Option>
                      <Option value={Months.Jun}>{Months.Jun}</Option>
                      <Option value={Months.Jul}>{Months.Jul}</Option>
                      <Option value={Months.Aug}>{Months.Aug}</Option>
                      <Option value={Months.Sep}>{Months.Sep}</Option>
                      <Option value={Months.Oct}>{Months.Oct}</Option>
                      <Option value={Months.Nov}>{Months.Nov}</Option>
                      <Option value={Months.Dec}>{Months.Dec}</Option>
                    </Select>
                  </Item>
                </Col>
                <Col xs={6} sm={3}>
                  <Item {...formLayout} label="Day">
                    <InputNumber
                      value={event.day}
                      onChange={(value: number) => {
                        this.setState(state => ({
                          event: { ...state.event, day: value },
                        }));
                      }}
                    />
                  </Item>
                </Col>
              </Row>
              <Item {...formLayout} label="Headline">
                <Input
                  value={event.headline}
                  onChange={e => {
                    const headline = e.target.value;
                    this.setState(state => ({
                      event: { ...state.event, headline },
                    }));
                  }}
                />
              </Item>
              <Item {...formLayout} label="Body">
                <TextArea
                  autosize={{ minRows: 2, maxRows: 6 }}
                  value={event.body}
                  onChange={e => {
                    const body = e.target.value;
                    this.setState(state => ({
                      event: { ...state.event, body },
                    }));
                  }}
                />
              </Item>

              <SectionHeading>Media</SectionHeading>
              <Tabs
                defaultActiveKey={MediaType.URL}
                activeKey={media.type}
                onChange={(nextKey: MediaType) => {
                  this.setState(state => ({
                    media: { ...state.media, type: nextKey },
                  }));
                }}
              >
                <TabPane tab={MediaType.URL} key={MediaType.URL}>
                  <Item {...formLayout}>
                    <Input
                      value={media.url}
                      onChange={e => {
                        const url = e.target.value;
                        this.setState(state => ({
                          media: { ...state.media, url },
                        }));
                      }}
                    />
                  </Item>
                </TabPane>
                <TabPane tab={MediaType.Image} key={MediaType.Image}>
                  <Item {...formLayout}>
                    <Dragger>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </Dragger>
                  </Item>
                </TabPane>
                <TabPane tab={MediaType.Quote} key={MediaType.Quote}>
                  <Item {...formLayout}>
                    <TextArea
                      autosize={{ minRows: 2, maxRows: 6 }}
                      value={media.quote}
                      onChange={e => {
                        const quote = e.target.value;
                        this.setState(state => ({
                          media: { ...state.media, quote },
                        }));
                      }}
                    />
                  </Item>
                </TabPane>
              </Tabs>
              <Item {...formLayout} label="Caption">
                <Input
                  value={media.caption}
                  onChange={e => {
                    const caption = e.target.value;
                    this.setState(state => ({
                      media: { ...state.media, caption },
                    }));
                  }}
                />
              </Item>
              <Item {...formLayout} label="Credit">
                <Input
                  value={media.credit}
                  onChange={e => {
                    const credit = e.target.value;
                    this.setState(state => ({
                      media: { ...state.media, credit },
                    }));
                  }}
                />
              </Item>

              <SectionHeading>Sources</SectionHeading>
              {sources.map((source, i) => (
                <Source
                  id={i + 1}
                  onChange={updatedSource => {
                    this.setState(state => ({
                      sources: state.sources.map((existingSource, j) => {
                        if (i === j) {
                          return updatedSource;
                        }
                        return existingSource;
                      }),
                    }));
                  }}
                  onRemove={() => {
                    this.setState(state => ({
                      sources: state.sources.filter((_, j) => i !== j),
                    }));
                  }}
                  source={source}
                />
              ))}
              <Item {...formLayout}>
                <Button
                  style={{ width: '100%' }}
                  type="dashed"
                  onClick={() => {
                    this.setState(state => ({
                      sources: state.sources.concat({
                        url: '',
                        publication: '',
                        date: moment(),
                      }),
                    }));
                  }}
                >
                  <Icon type="plus" /> Add source
                </Button>
              </Item>
              <Item {...formLayout}>
                <Button onClick={this.submitEvent} type="primary">
                  Submit for review
                </Button>
              </Item>
            </Form>
          </Wrapper>
        </Content>
      </Layout>
    );
  }
}

export default App;
