import { MongoClient as client } from 'mongodb';
import { dropAndCreatePosts, getPostCountPerTag } from './lib/PostService';

let url = 'mongodb://localhost:27017/test';

client.connect(url, (err, db) => {
  let posts = db.collection("posts");

  dropAndCreatePosts(posts, 1000)
  .then(() =>
    getPostCountPerTag(posts).then(docs => {
      console.dir(docs);
    }).catch(e => {
      console.error(e);
    }).then(() => {
      db.close();
    }));
});