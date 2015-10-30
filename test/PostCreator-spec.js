import { assert } from 'chai';
import { generateUniqueRandomTagsFromAtoZ, makeRandomPosts } from '../lib/PostCreator';

describe("Post Creator", () => {
  it("should have both methods defined", () => {
    assert.notEqual(undefined, makeRandomPosts, "makeRandomPosts should be defined");
    assert.notEqual(undefined, generateUniqueRandomTagsFromAtoZ, "generateUniqueRandomTagsFromAtoZ should be defined");
  });

  describe("generateUniqueRandomTagsFromAtoZ", () => {
    it("should work when provided with undefined as quantity", () => {
      let tags = generateUniqueRandomTagsFromAtoZ(undefined);
      assert.equal(tags.length, 0, "should return empty array");
    });

    it("should work when provided with 0 as quantity", () => {
      let tags = generateUniqueRandomTagsFromAtoZ(0);
      assert.equal(tags.length, 0, "should return empty array");
    });

    it("should generate 1 to n random tag arrays going from A to Z", () => {
      let tags = generateUniqueRandomTagsFromAtoZ(26);
      assert.isBelow(tags.length, 27, true, "Should be less or equal to 26");
    });

    it("should be random", () => {
      let t1 = generateUniqueRandomTagsFromAtoZ(26);
      let t2 = generateUniqueRandomTagsFromAtoZ(26);

      assert.notStrictEqual(t1, t2, "t1 and t2 should not be strictly equals");
    });
  });

  describe("makeRandomPosts", () => {
    it("should work when provided with undefined as quantity", () => {
      let posts = makeRandomPosts(undefined);
      assert.equal(posts.length, 0, "should return empty array");
    });

    it("should work when provided 0 as quantity", () => {
      let posts = makeRandomPosts(0);
      assert.equal(posts.length, 0, "should return empty array");
    });

    it("should generate n posts going from A to Z", () => {
      let posts = makeRandomPosts(26);
      let letters = posts.map(x => x.title.split(" ")[1]).join('');
      
      assert.equal(letters, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "Should have exactly 26 letters from A to Z");
    });

    it("should be able to go past 26 posts", () => {
      let posts = makeRandomPosts(30);
      let letters = posts.map(x => x.title.split(" ")[1]).join('');
      
      assert.equal(letters, "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^", "Should have exactly 30 letters from A to Z + [\\]^");
    });
  });
});