import {
  createSet,
  getNumToFullSet,
  getPropertiesFromSet,
  getSetColor,
  getSetSize,
  getTotalSetSize,
  isFullSet,
} from "../game/utils/set";

describe("Set Utils", () => {
  describe("getNumToFullSet()", () => {
    it("should return null if the passed in color is not valid", () => {
      const numToFullSet = getNumToFullSet("blasdbf");
      expect(numToFullSet).toBe(null);
    });
    it("should return 3 for red", () => {
      const numToFullSet = getNumToFullSet("red");
      expect(numToFullSet).toBe(3);
    });
    it("should return 3 for yellow", () => {
      const numToFullSet = getNumToFullSet("yellow");
      expect(numToFullSet).toBe(3);
    });
    it("should return 3 for orange", () => {
      const numToFullSet = getNumToFullSet("orange");
      expect(numToFullSet).toBe(3);
    });
    it("should return 3 for green", () => {
      const numToFullSet = getNumToFullSet("green");
      expect(numToFullSet).toBe(3);
    });
    it("should return 3 for purple", () => {
      const numToFullSet = getNumToFullSet("purple");
      expect(numToFullSet).toBe(3);
    });
    it("should return 3 for sky", () => {
      const numToFullSet = getNumToFullSet("sky");
      expect(numToFullSet).toBe(3);
    });
    it("should return 2 for mint", () => {
      const numToFullSet = getNumToFullSet("mint");
      expect(numToFullSet).toBe(2);
    });
    it("should return 2 for blue", () => {
      const numToFullSet = getNumToFullSet("blue");
      expect(numToFullSet).toBe(2);
    });
    it("should return 2 for brown", () => {
      const numToFullSet = getNumToFullSet("brown");
      expect(numToFullSet).toBe(2);
    });
    it("should return 4 for black", () => {
      const numToFullSet = getNumToFullSet("black");
      expect(numToFullSet).toBe(4);
    });
  });
  describe("createSet()", () => {
    it("should create a set successfully", () => {
      const set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      expect(set.id).toBeTruthy();
      expect(set.cards).toEqual([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
    });
    it("should create an empty set by default", () => {
      const set = createSet();
      expect(set.id).toBeTruthy();
      expect(set.cards).toEqual([]);
    });
  });
  describe("getPropertiesFromSet()", () => {
    it("should return empty array if given a bad set", () => {
      const set = {
        id: "123",
      };
      expect(getPropertiesFromSet(set)).toEqual([]);
    });
    it("should filter out cards that arent properties", () => {
      const set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      expect(getPropertiesFromSet(set)).toEqual([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
      ]);
    });
    it("should only output wilds, pure wilds, and normal properties", () => {
      const set = createSet([
        "v1-8b8206b8-20d8-41b6-9193-b5ce06e061b0", // orange
        "v1-82bbac59-d611-4adc-9166-e2ad7e081d49", // purple-orange
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      expect(getPropertiesFromSet(set)).toEqual([
        "v1-8b8206b8-20d8-41b6-9193-b5ce06e061b0", // orange
        "v1-82bbac59-d611-4adc-9166-e2ad7e081d49", // purple-orange
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
      ]);
    });
  });
  describe("getSetSize()", () => {
    it("should return a count based on properties", () => {
      const set = createSet([
        "v1-8b8206b8-20d8-41b6-9193-b5ce06e061b0", // orange
        "v1-82bbac59-d611-4adc-9166-e2ad7e081d49", // purple-orange
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      expect(getSetSize(set)).toBe(3);
    });
  });
  describe("getTotalSetSize()", () => {
    it("should return total size of a set", () => {
      const set = createSet([
        "v1-8b8206b8-20d8-41b6-9193-b5ce06e061b0", // orange
        "v1-82bbac59-d611-4adc-9166-e2ad7e081d49", // purple-orange
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      expect(getTotalSetSize(set)).toBe(4);
    });
  });
  describe("getSetColor()", () => {
    it("should return null if the set only includes all pure-wilds", () => {
      const state = { wilds: {} };
      const set = createSet([
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293",
        "v1-666a307b-67ad-4517-91ee-2511dbeb92a5",
      ]);
      expect(getSetColor(state, set)).toBe(null);
    });
    it("should return null if the cards dont all have the same color", () => {
      const state = { wilds: {} };
      const set = createSet([
        "v1-983d0fc3-9929-470c-9b0b-0652a0c71c2b", // red
        "v1-5e9104e1-377a-43e8-87b9-20d83e1241ab", // yellow
      ]);
      expect(getSetColor(state, set)).toBe(null);
    });
    it("should work even with wild cards", () => {
      const state = {
        wilds: {
          "v1-82bbac59-d611-4adc-9166-e2ad7e081d49": "purple",
        },
      };
      const set = createSet([
        "v1-bfd9ded2-c8f2-4050-8e65-8fc66e290812",
        "v1-82bbac59-d611-4adc-9166-e2ad7e081d49", // purple-orange
      ]);
      expect(getSetColor(state, set)).toBe("purple");
    });
    it("should work with a mixture of all kinds of properties", () => {
      const state = {
        wilds: {
          "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3": "green",
        },
      };
      const set = createSet([
        "v1-37b20bb3-530d-460b-bb6d-2c561042bf9a", // green
        "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3", // blue-green
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
      ]);
      expect(getSetColor(state, set)).toBe("green");
    });
    it("should work with all kinds of set cards", () => {
      const state = {
        wilds: {
          "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3": "green",
        },
      };
      const set = createSet([
        "v1-37b20bb3-530d-460b-bb6d-2c561042bf9a", // green
        "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3", // blue-green
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
        "v1-e14b97d9-e355-4c46-a25f-9525bc81d7ca", // house
      ]);
      expect(getSetColor(state, set)).toBe("green");
    });
  });
  describe("isFullSet()", () => {
    it("should not be a full set if set has 1 card or less", () => {
      const state = { wilds: {} };
      let set = createSet([]);
      expect(isFullSet(state, set)).toBe(false);
      set = createSet([
        "v1-37b20bb3-530d-460b-bb6d-2c561042bf9a", // green
      ]);
      expect(isFullSet(state, set)).toBe(false);
    });
    it("should not be a full set if every card in the set is a pure wild", () => {
      const state = { wilds: {} };
      const set = createSet([
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293",
        "v1-666a307b-67ad-4517-91ee-2511dbeb92a5",
      ]);
      expect(isFullSet(state, set)).toBe(false);
    });
    it("should not be a full set if the number of properties in a set does not meet threshold", () => {
      const state = {
        wilds: {
          "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3": "green",
        },
      };
      const set = createSet([
        "v1-37b20bb3-530d-460b-bb6d-2c561042bf9a", // green
        "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3", // blue-green
      ]);
      expect(isFullSet(state, set)).toBe(false);
    });
    it("should be a full set as long as one card in the set is property", () => {
      const state = { wilds: {} };
      const set = createSet([
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293",
        "v1-666a307b-67ad-4517-91ee-2511dbeb92a5",
        "v1-37b20bb3-530d-460b-bb6d-2c561042bf9a", // green
      ]);
      expect(isFullSet(state, set)).toBe(true);
    });
    it("should be a full set as long as one card in the set is a wild property", () => {
      const state = {
        wilds: {
          "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3": "green",
        },
      };
      const set = createSet([
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293",
        "v1-666a307b-67ad-4517-91ee-2511dbeb92a5",
        "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3", // blue-green
      ]);
      expect(isFullSet(state, set)).toBe(true);
    });
    it("should be a full set even if theres a house attached to the set", () => {
      const state = {
        wilds: {
          "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3": "green",
        },
      };
      const set = createSet([
        "v1-37b20bb3-530d-460b-bb6d-2c561042bf9a", // green
        "v1-b8dfe5aa-00ab-4ab1-a6e7-fca409ad5fa3", // blue-green
        "v1-b76dbc82-109b-4a28-8112-4c5b23775293", // pure-wild
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
        "v1-e14b97d9-e355-4c46-a25f-9525bc81d7ca", // house
      ]);

      expect(isFullSet(state, set)).toBe(true);
    });
  });
});
