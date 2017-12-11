import React, { Component } from 'react';
import $ from 'jquery';
import { Tabs } from 'antd';
import { Modal, Button, Divider, Checkbox, List, } from 'antd';
const CheckboxGroup = Checkbox.Group;


class tweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textTweets: [],
      imageTweets: [],
      textImageTweets: [],
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
    this.getTweetsfromDb();
  }
  getTweetsfromDb(){
    $.ajax({
            url: 'https://twitter-chrome-server.herokuapp.com/get_tweets',
            method: 'GET',
            crossDomain: true,
            dataType: 'json'
        }).done(function (response) {
            this.setState({
              textTweets: response.text,
              imageTweets: response.images,
              textImageTweets: response.text_images
            })
        }.bind(this))
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
            crossDomain: true,
            dataType: 'json',
            data: {
                'new_handles': this.state.new_handles,
                'removed_handles': this.state.removed_handles
            }
        }).done(function (response) {
            console.log(response);
            this.getTweetsfromDb();
        }.bind(this))

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
    var { textTweets, imageTweets, textImageTweets, newvalue, current_handles, removed_handles } = this.state;
    return (
      <div>
        <Tabs tabBarExtraContent={operations}
          defaultActiveKey="1">
          <TabPane style={{padding:'20px'}}
            tab="Text" key="1">
            <List
              itemLayout="horizontal"
              dataSource={textTweets}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a target='_blank' href={`https://twitter.com/${item.handle}`}>{item.handle}</a>}
                    description={item.text}
                  />
                  <div>{item.time.substring(0,18)}</div>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane style={{padding:'20px'}}
            tab="Images" key="2">
            <List
              itemLayout="horizontal"
              dataSource={imageTweets}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a target='_blank' href={`https://twitter.com/${item.handle}`}>{item.handle}</a>}
                    description={<div>
                      {item.media.map((d,i) =>
                          (<img key={i} style={{width:'30%', margin:'2px'}}
                            alt='media_image' src={d.media_url_https}>
                          </img>)
                      )}
                    </div>
                    }
                  />
                  <div>{item.time.substring(0,18)}</div>
                </List.Item>
              )}
            /></TabPane>
          <TabPane style={{padding:'20px'}}
            tab="Text and Images" key="3">
            <List
              itemLayout="horizontal"
              dataSource={textImageTweets}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a target='_blank' href={`https://twitter.com/${item.handle}`}>{item.handle}</a>}
                    description={<div>
                      <p>{item.text}</p>
                      {item.media.map((d,i) =>
                          (<img key={i} style={{width:'30%', margin:'2px'}}
                            alt='media_image' src={d.media_url_https}>
                          </img>)
                      )}
                    </div>
                    }
                  />
                  <div>{item.time.substring(0,18)}</div>
                </List.Item>
              )}
            /></TabPane>
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
