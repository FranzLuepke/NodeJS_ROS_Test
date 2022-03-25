#!/usr/bin/env node
const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs');

rosnodejs.initNode('my_node')
.then((nh) => {
  const pub = nh.advertise('/my_topic', std_msgs.msg.String);
  const msg = new std_msgs.msg.String();
  msg.data = 'Hello, World';
  setInterval(() => {
    pub.publish(msg);
    rosnodejs.log.info('Publishing:', msg);
  }, 1000);
});