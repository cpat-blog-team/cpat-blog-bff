/*
  SEED DEMO SCRIPT
  This script will wipe the db and seed it with 7 unique blogs. 
  - Each post has its own user and unique title relevant to something a cpat'er may write about.
  - The content of each post is 1 of two quill deltas stored in ./seedContent.json 
      Both have styled laurem ispum and an image.
*/


const demoList = [
  {
    email: 'bob@ibm.com',
    name: 'Bob',
    title: 'Bobs blog',
    summary: 'bobs summary',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  },
  {
    email: 'mark@ibm.com',
    name: 'Mark',
    title: '5 WKF Tips',
    summary: '5 Tips to be more while productive working from home',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  },
  {
    email: 'isaiah@ibm.com',
    name: 'Isaiah',
    title: 'My Software Engineering Journey',
    summary: 'How I became a software engineer',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  },
  {
    email: 'esther@ibm.com',
    name: 'Esther',
    title: '10 Things to know about CP4A',
    summary: '10 things you should know about cloud pak for applications',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  },
  {
    email: 'dan@ibm.com',
    name: 'Dan',
    title: 'Installing openshift 4.3',
    summary: 'A quick guide on installing openshift 4,3',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  },
  {
    email: 'napoleon@ibm.com',
    name: 'Napoleon',
    title: 'Tekton Crash Course',
    summary: 'Everything you need to know about tekton in 5 minutes',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  },
  {
    email: 'dave@ibm.com',
    name: 'Dave',
    title: 'Installing CP4D on IBM cloud',
    summary: 'My guide to installing cp4d on ibm cloud',
    version: 1,
    date: new Date().toDateString(),
    approved: 'Approved'
  }
];

const { readFileSync } = require('fs');
const request = require('request-promise');

const seedDemo = async () => {
  const content = JSON.parse(readFileSync(`${__dirname}/seedContent.json`));

  demoList.forEach((blog) => {
    blog.content = JSON.stringify(content[Math.floor(Math.random() * 2)]);
  });

  // wipe DB
  await request({
    method: 'DELETE',
    url: 'http://localhost:3000/dev/wipeDB',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    }
  });

  // seed first half of blogs
  await request({
    method: 'POST',
    url: 'http://localhost:3000/dev/seedManyBlogs',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify({ blogs: demoList.slice(0, 4) })
  });

  // seed second half of blogs
  await request({
    method: 'POST',
    url: 'http://localhost:3000/dev/seedManyBlogs',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify({ blogs: demoList.slice(4) })
  });

  // seed community guidelines
  await request({
    method: 'POST',
    url: 'http://localhost:3000/communityGuidelines',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify(demoList[0])
  });

  console.log('DB SEEDED FOR DEMO!');
};

seedDemo();

