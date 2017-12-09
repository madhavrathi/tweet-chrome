import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Button, notification } from 'antd';



class tweets extends Component {

  openNotification (){
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }

  componentDidMount() {
    this.openNotification();
  }

  render() {

    const TabPane = Tabs.TabPane;
    const operations = <Button>Extra Action</Button>;

    return (
      <div>
        <Tabs tabBarExtraContent={operations}
          defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default tweets;
