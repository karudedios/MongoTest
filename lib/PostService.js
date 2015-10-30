import { generateUniqueRandomTagsFromAtoZ, makeRandomPosts } from './PostCreator';

export default ({
  /**
   * Clears collection and insert n documents to it
   *
   * 
   * @param   {[Collection]}  postCollection  MongoDB Collection
   * 
   * @param   {[Number]}      n               Quantity of Items to insert
   * 
   * @return  {[Promise]}                     Promise that will be resolved if succeded
   *                                          or reject if errored
   */
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

  /**
   * Gets count of posts per tag
   *
   * 
   * @param   {[Collection]}  postCollection  MongoDB Collection
   * 
   * @return  {[Promise]}                     Promise that will be resolved with post
   *                                          count per tag or rejected with error
   */
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