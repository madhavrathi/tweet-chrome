import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Modal, Button, Form, Input, Icon, Divider, Checkbox } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

let uuid = 0;

class tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      checked: ''
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  onChange = (checkedValues) => {
    console.log(checkedValues)
    this.setState({checked: checkedValues});
  }
  componentDidMount() {
  }

  //Form Controls
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one handle
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }



  render() {

    const { visible, loading } = this.state;
    const plainOptions = ['Text', 'Images', 'Text with Images'];
    const TabPane = Tabs.TabPane;
    const operations = <Button onClick={this.showModal}>Settings</Button>;

    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
    return (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Handles' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names-${k}`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "Please input twitter handle or delete this field.",
          }],
        })(
          <Input placeholder="twitter handle" style={{ width: '60%', marginRight: 8 }} />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    );
  });

    return (
      <div>
        <Tabs tabBarExtraContent={operations}
          defaultActiveKey="1">
          <TabPane tab="Text" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="Images" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Text and Images" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>

        {/*Modals*/}
        <Modal
          bodyStyle={{ height:'200px',overflow: 'auto' }}
          visible={visible}
          title="Settings"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Divider>Twitter Handles</Divider>
          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> Add field
              </Button>
            </FormItem>
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
          </Form>

          <Divider>Notifications</Divider>
          <CheckboxGroup options={plainOptions} defaultValue={['Text']} onChange={this.onChange} />

        </Modal>

      </div>
    );
  }
}
const Wraptweets = Form.create()(tweets);

export default Wraptweets;
