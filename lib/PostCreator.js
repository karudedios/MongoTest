export default (() => {
  let randomLettersFromAtoZ = (n) => {
    let t = Math.ceil(Math.random() * 26);
    let c = String.fromCharCode(t + 65);

    return n > 0 ? `${c}${randomLettersFromAtoZ(n - 1)}` : c
  };

  let generateUniqueRandomTagsFromAtoZ = (tagQuantity) => {
    let tagSeed = Array.apply(null, { length: tagQuantity }).map((_, i) => String.fromCharCode(65 + i));
    let n = Math.ceil(Math.random() * tagSeed.length);

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
    makeRandomPosts(n) {
      return Array.apply(null, { length: n }).map((_, i) => {
        return {
          title: `Post ${String.fromCharCode(65 + i)}`,
          content: 'This is dummy content',
          tags: generateUniqueRandomTagsFromAtoZ(5)
        };
      });
    }
  }
})();;