import { generateUniqueRandomTagsFromAtoZ, makeRandomPosts } from './PostCreator';

export default ({
  dropAndCreatePosts(postCollection, n) {
    return new Promise((resolve, reject) => {
      postCollection.drop();
      postCollection.insertMany(makeRandomPosts(n), {}, (e, r) => {
        if (e)
          reject();
        else
          resolve();
      });
    })
  },

  getPostCountPerTag(postCollection) {
    return new Promise((resolve, reject) => {
      postCollection.aggregate([
          { $unwind: "$tags" },
          { $group: { "_id": "$tags", 'count': { $sum: 1 } } }
        ], {}, (e, docs) => {
          if (e)
            reject(e);
          else
            resolve(docs);
        });
    });
  }
});