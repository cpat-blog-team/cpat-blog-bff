import { ICommunityGuidelines } from '../../src/models/CommunityGuidelines';
export const exampleGuidelines: ICommunityGuidelines = {
  name: 'Bob',
  email: 'bob@Blob.com',
  content: JSON.stringify({
    'ops': [
      {
        'attributes': {
          'italic': true,
          'bold': true
        },
        'insert': 'Nulla eget nunc dolor.'
      }
    ]
  }),
  version: 0,
  date: new Date().toDateString()
};