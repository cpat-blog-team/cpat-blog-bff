const demoList = [
  {
    email: 'bob@ibm.com',
    name: 'Bob',
    title: 'Bobs blog',
    summary: 'bobs summary',
    version: 1,
    date: new Date().toDateString()
  },
  {
    email: 'mark@ibm.com',
    name: 'Mark',
    title: '5 WKF Tips',
    summary: '5 Tips to be more while productive working from home',
    version: 1,
    date: new Date().toDateString()
  },
  {
    email: 'isaiah@ibm.com',
    name: 'Isaiah',
    title: 'My Software Engineering Journey',
    summary: 'How I became a software engineer',
    version: 1,
    date: new Date().toDateString()
  },
  {
    email: 'esther@ibm.com',
    name: 'Esther',
    title: '10 Things to know about CP4A',
    summary: '10 things you should know about cloud pak for applications',
    version: 1,
    date: new Date().toDateString()
  },
  {
    email: 'dan@ibm.com',
    name: 'Dan',
    title: 'Installing openshift 4.3',
    summary: 'A quick guide on installing openshift 4,3',
    version: 1,
    date: new Date().toDateString()
  },
  {
    email: 'napoleon@ibm.com',
    name: 'Napoleon',
    title: 'Tekton Crash Course',
    summary: 'Everything you need to know about tekton in 5 minutes',
    version: 1,
    date: new Date().toDateString()
  },
  {
    email: 'dave@ibm.com',
    name: 'Dave',
    title: 'Installing CP4D on IBM cloud',
    summary: 'My guide to installing cp4d on ibm cloud',
    version: 1,
    date: new Date().toDateString()
  }
];

const { readFileSync } = require('fs');
const request = require('request-promise');

const seedDemo = async () => {
  const content = JSON.parse(readFileSync(`${__dirname}/seedContent.json`));

  demoList.forEach((blog) => {
    blog.content = JSON.stringify(content[Math.floor(Math.random() * 2)]);
  });

  await request({
    method: 'POST',
    url: 'http://localhost:3000/dev/seed',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify({ blogs: demoList.slice(0, 4) })
  });

  await request({
    method: 'POST',
    url: 'http://localhost:3000/blogs/add',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify(demoList[4])
  });

  await request({
    method: 'POST',
    url: 'http://localhost:3000/blogs/add',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify(demoList[5])
  });

  await request({
    method: 'POST',
    url: 'http://localhost:3000/blogs/add',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify(demoList[6])
  });

  console.log('DB SEEDED FOR DEMO!');
};

seedDemo();

