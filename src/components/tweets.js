import React, { Component } from 'react';
import $ from 'jquery';
import { Tabs } from 'antd';
import { Modal, Button, Divider, Checkbox, List, } from 'antd';
const CheckboxGroup = Checkbox.Group;


class tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      checked: '',
      current_handles: ['mdhvrthi'],
      removed_handles: [],
      new_handles: [],
      newvalue: ''
    };
  }
  componentDidMount() {
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    console.log('New: '+this.state.new_handles);
    console.log('Removed: '+this.state.removed_handles);
    $.ajax({
            url: 'https://twitter-chrome-server.herokuapp.com/handles',
            method: 'GET',
            dataType: 'json',
            data: {
                'new_handles': this.state.new_handles,
                'removed_handles': this.state.removed_handles
            }
        }).done(function (response) {
            console.log(response);
        })

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  onChange = (checkedValues) => {
    this.setState({checked: checkedValues});
  }

  //Form Controls
  handleAdd = (e) => {
    var { newvalue, current_handles, new_handles  } = this.state;
    if(newvalue !== ''){
      new_handles.push(newvalue);
      current_handles.push(newvalue);
      this.setState({current_handles,new_handles,newvalue:''});
    }
  }
  handleValue = (e) => {
    this.setState({newvalue: e.target.value});
  }

  render() {

    const { visible, loading } = this.state;
    const plainOptions = ['Text', 'Images', 'Text with Images'];
    const TabPane = Tabs.TabPane;
    const operations = <Button onClick={this.showModal}>Settings</Button>;
    //handles form
    var { newvalue, current_handles, removed_handles } = this.state;
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
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={current_handles}
            renderItem={item => (
              <List.Item actions={[<Button onClick={() => {
                current_handles = current_handles.filter(e => e !== item);
                removed_handles.push(item);
                this.setState({current_handles,removed_handles});

              }} type="danger">Remove</Button>]}>
                <List.Item.Meta
                  title={item}
                />
              </List.Item>
            )}
          />
          <form>
            <input style={{margin: '3%'}}
              placeholder='Enter a valid handle'
              value={newvalue}
              onChange={this.handleValue}
              type='text'>
            </input>
            <Button onClick={this.handleAdd}
              type="primary">Add Handles
            </Button>
          </form>
          <Divider>Notifications</Divider>
          <CheckboxGroup options={plainOptions} defaultValue={['Text']} onChange={this.onChange} />
        </Modal>

      </div>
    );
  }
}
export default tweets;
