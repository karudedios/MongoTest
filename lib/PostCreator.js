export default (() => {
  /**
   * Function that attach a random letter from A to Z n times
   *
   * 
   * @param   {[Number]}  n  Amount of times to append a new letter
   * 
   * @return  {[String]}     Random combination of letters
   */
  let randomLettersFromAtoZ = (n) => {
    let t = Math.ceil(Math.random() * 26);
    let c = String.fromCharCode(t + 65);

    return n > 0 ? `${c}${randomLettersFromAtoZ(n - 1)}` : c
  };

  /**
   * Makes a new array of 1 to n unique random combination of letters
   *
   * 
   * @param   {[Number]}  tagQuantity  Limit of tags
   * 
   * @return  {[Array]}                1 to n tags
   */
  let generateUniqueRandomTagsFromAtoZ = (tagQuantity) => {
    let n = Math.ceil(Math.random() * tagQuantity);

    let keys = Array.apply(null, { length: n }).map((_, i) => {
      return randomLettersFromAtoZ(Math.ceil(Math.random() * n) - 1);
    }).reduce((ob, _) => {
      ob[_] = true;
      return ob;
    }, {});

    return Object.keys(keys);
  };

  return {
    generateUniqueRandomTagsFromAtoZ,
    /**
     * Generates n random posts
     *
     * 
     * @param   {[Number]}  n  Amount of posts to generate
     * @return  {[Array]}      n posts
     */
    makeRandomPosts(n) {
      return Array.apply(null, { length: n }).map((_, i) => {
        return {
          title: `Post ${String.fromCharCode(65 + i)}`,
          content: 'This is dummy content',
          /**
           * Randomly generated tags
           *
           * Note: 5 stands for an amount of Tags that will give us plenty random combinations,
           * but as well can be easily repeated if many posts are created.
           * 
           * @type  {[Array]}
           */
          tags: generateUniqueRandomTagsFromAtoZ(5)
        };
      });
    }
  }
})();;