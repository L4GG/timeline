// import * as React from 'react';
// import styled from 'styled-components';
// import {
//   Button,
//   Col,
//   Form as AntForm,
//   Icon,
//   Input,
//   InputNumber,
//   Row,
//   Select,
//   Tabs,
//   Upload,
// } from 'antd';
// import { FormComponentProps } from 'antd/lib/form/Form';

// import Source from './Source';

// interface Fields {
//   year: number;
// }

// interface Props extends Fields {
//   onChange: (formFields: number[]) => void;
// }

// const { Dragger } = Upload;
// const { Item, createFormField } = AntForm;
// const { Option } = Select;
// const { TextArea } = Input;
// const { TabPane } = Tabs;

// const SectionHeading = styled.h2`border-bottom: solid 1px #ddd;`;

// export const formLayout = {
//   colon: false,
// };

// const Form = ({ form: { getFieldDecorator } }: Props & FormComponentProps) => (
//   <AntForm>
//     <SectionHeading>Event</SectionHeading>
//     <Row>
//       <Col xs={6} sm={3}>
//         <Item {...formLayout} label="Year">
//           {getFieldDecorator('year', {
//             rules: [{ required: true }],
//           })(<InputNumber />)}
//         </Item>
//       </Col>
//       <Col xs={6} sm={3}>
//         <Item {...formLayout} label="Month">
//           <Select
//             onChange={stuff => {
//               // tslint:disable
//               console.log(stuff);
//             }}
//           >
//             <Option value={undefined}>—</Option>
//             <Option value="Jan">Jan</Option>
//             <Option value="Feb">Feb</Option>
//             <Option value="Mar">Mar</Option>
//             <Option value="Apr">Apr</Option>
//             <Option value="May">May</Option>
//             <Option value="Jun">Jun</Option>
//             <Option value="Jul">Jul</Option>
//             <Option value="Aug">Aug</Option>
//             <Option value="Sep">Sep</Option>
//             <Option value="Oct">Oct</Option>
//             <Option value="Nov">Nov</Option>
//             <Option value="Dec">Dec</Option>
//           </Select>
//         </Item>
//       </Col>
//       <Col xs={6} sm={3}>
//         <Item {...formLayout} label="Day">
//           <InputNumber />
//         </Item>
//       </Col>
//     </Row>
//     <Item {...formLayout} label="Headline">
//       <Input />
//     </Item>
//     <Item {...formLayout} label="Body">
//       <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
//     </Item>

//     <SectionHeading>Media</SectionHeading>
//     <Tabs defaultActiveKey="1">
//       <TabPane tab="URL" key="1">
//         <Item {...formLayout}>
//           <Input />
//         </Item>
//       </TabPane>
//       <TabPane tab="Image" key="2">
//         <Item {...formLayout}>
//           <Dragger>
//             <p className="ant-upload-drag-icon">
//               <Icon type="inbox" />
//             </p>
//             <p className="ant-upload-text">
//               Click or drag file to this area to upload
//             </p>
//           </Dragger>
//         </Item>
//       </TabPane>
//       <TabPane tab="Quote" key="3">
//         <Item {...formLayout}>
//           <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
//         </Item>
//       </TabPane>
//     </Tabs>
//     <Item {...formLayout} label="Caption">
//       <Input />
//     </Item>
//     <Item {...formLayout} label="Credit">
//       <Input />
//     </Item>

//     <SectionHeading>Sources</SectionHeading>
//     <Source id={1} onChange={() => undefined} onRemove={() => undefined} />
//     <Item {...formLayout}>
//       <Button style={{ width: '100%' }} type="dashed" /*onClick={this.add}*/>
//         <Icon type="plus" /> Add source
//       </Button>
//     </Item>
//     <Item {...formLayout}>
//       <Button type="primary">Submit for review</Button>
//     </Item>
//   </AntForm>
// );

// export default AntForm.create<Props>({
//   onFieldsChange: ({ onChange }, changedFields) => {
//     onChange(changedFields);
//   },
//   mapPropsToFields: props => {
//     return {
//       year: createFormField({
//         value: props.year,
//       }),
//     };
//   },
//   onValuesChange: (props, values) => {
//     // tslint:disable:no-console
//     console.log(values);
//   },
// })(Form);
