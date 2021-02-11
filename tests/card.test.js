import {
  getCardType,
  getActionType,
  getWildColors,
  getRentableColors,
  getCurrentWildColor,
  isProperty,
  isWildProperty,
  isSomeProperty,
  isPureWild,
  getPropertyColor,
} from "../game/utils/card";

describe("Card Utils", () => {
  describe("getCardType()", () => {
    it("should work for action cards", () => {
      const cardId = "v1-cad4518a-c8b8-4cd6-ac6a-2e8ab52f694e";
      const cardType = getCardType(cardId);
      expect(cardType).toBe("action");
    });
    it("should work for cash cards", () => {
      const cardId = "v1-a5907b43-58aa-491b-861b-4f5733f30615";
      const cardType = getCardType(cardId);
      expect(cardType).toBe("cash");
    });
    it("should work for wild property cards", () => {
      const cardId = "v1-ee4a208b-fb05-41f0-8edd-1693b5ff1e94";
      const cardType = getCardType(cardId);
      expect(cardType).toBe("wild");
    });
    it("should work for pure wild cards", () => {
      const cardId = "v1-b76dbc82-109b-4a28-8112-4c5b23775293";
      const cardType = getCardType(cardId);
      expect(cardType).toBe("pure-wild");
    });
    it("should work for property cards", () => {
      const cardId = "v1-c14636fa-83b0-46db-92e2-1b3c595eca39";
      const cardType = getCardType(cardId);
      expect(cardType).toBe("property");
    });
    it("should return null if passed a bad card id", () => {
      const cardId = "-46db-92e2-1b3c595eca39";
      const cardType = getCardType(cardId);
      expect(cardType).toBe(null);
    });
  });
  describe("getActionType()", () => {
    it("should work for Say No", () => {
      const cardId = "v1-cad4518a-c8b8-4cd6-ac6a-2e8ab52f694e";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("say-no");
    });
    it("should work for Dealbreaker", () => {
      const cardId = "v1-80134889-3dae-4547-8d7e-70dd7a5a4146";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("dealbreaker");
    });
    it("should work for Sly Deal", () => {
      const cardId = "v1-876ae3b9-a2b1-4518-bf63-e8af6e3df2c3";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("sly-deal");
    });
    it("should work for Forced Deal", () => {
      const cardId = "v1-b164c06c-bdf8-4d52-9baf-cb8db6424417";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("forced-deal");
    });
    it("should work for Birthday", () => {
      const cardId = "v1-78bc7899-e29f-4d6a-bb36-e4a6f5d0ed1f";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("birthday");
    });
    it("should work for Rent", () => {
      const cardId = "v1-cd830f96-334e-4232-b14a-bc0f85f61f7f";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("rent");
    });
    it("should work for Wild Rent", () => {
      const cardId = "v1-8d95f7b9-61d2-4ddc-acaa-20da9d658043";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("wild-rent");
    });
    it("should work for House", () => {
      const cardId = "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("house");
    });
    it("should work for Pass Go", () => {
      const cardId = "v1-70924b0c-f4a0-4bbc-b43c-4121d25b4493";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("pass-go");
    });
    it("should work for Debt Collector", () => {
      const cardId = "v1-2abb0726-136d-45a5-a87e-fecf96032c6f";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("debt-collector");
    });
    it("should work for Double Rent", () => {
      const cardId = "v1-35a61034-f27a-42a0-9760-d84bce039967";
      const actionType = getActionType(cardId);
      expect(actionType).toBe("double-rent");
    });
    it("should return null if the card passed in is not an action", () => {
      const cardId = "v1-a5907b43-58aa-491b-861b-4f5733f30615";
      const actionType = getActionType(cardId);
      expect(actionType).toBe(null);
    });
  });
  describe("getWildColors()", () => {
    it("should return null if card passed in is not a wild", () => {
      const cardId = "v1-a5907b43-58aa-491b-861b-4f5733f30615";
      const wildColors = getWildColors(cardId);
      expect(wildColors).toBe(null);
    });
    it("should return the colors of a wild card", () => {
      const cardId = "v1-f07196d6-4a4e-4cff-bb29-5019d49b8e42";
      const wildColors = getWildColors(cardId);
      expect(wildColors).toEqual(["red", "yellow"]);
    });
  });
  describe("getRentableColors()", () => {
    it("should return null if card passed in is not a rent card", () => {
      const cardId = "v1-a5907b43-58aa-491b-861b-4f5733f30615";
      const rentableColors = getRentableColors(cardId);
      expect(rentableColors).toBe(null);
    });
    it("should return the colors of a rent card", () => {
      const cardId = "v1-cd830f96-334e-4232-b14a-bc0f85f61f7f";
      const rentableColors = getRentableColors(cardId);
      expect(rentableColors).toEqual(["blue", "green"]);
    });
  });
  describe("getCurrentWildColor()", () => {
    it("should return null if the card isnt a wild", () => {
      const cardId = "v1-a5907b43-58aa-491b-861b-4f5733f30615";
      const state = { wilds: {} };
      const color = getCurrentWildColor(state, cardId);
      expect(color).toBe(null);
    });
    it("should return null if the color of the wild is undefined", () => {
      const cardId = "v1-82bbac59-d611-4adc-9166-e2ad7e081d49";
      const state = { wilds: {} };
      const color = getCurrentWildColor(state, cardId);
      expect(color).toBe(null);
    });
    it("should return null if the color of the wild doesnt match the card's wild colors", () => {
      const cardId = "v1-82bbac59-d611-4adc-9166-e2ad7e081d49";
      const state = {
        wilds: {
          [cardId]: "red",
        },
      };
      const color = getCurrentWildColor(state, cardId);
      expect(color).toBe(null);
    });
    it("should return the current color of the wild", () => {
      const cardId = "v1-82bbac59-d611-4adc-9166-e2ad7e081d49";
      const state = {
        wilds: {
          [cardId]: "purple",
        },
      };
      const color = getCurrentWildColor(state, cardId);
      expect(color).toBe("purple");
    });
  });
  describe("isProperty()", () => {
    it("should return false if card is not a property", () => {
      const cardId = "v1-a2d7ffcb-f2eb-457d-baec-35aebab8a146";
      const result = isProperty(cardId);
      expect(result).toBe(false);
    });
    it("should return true if card is a property", () => {
      const cardId = "v1-c14636fa-83b0-46db-92e2-1b3c595eca39";
      const result = isProperty(cardId);
      expect(result).toBe(true);
    });
  });
  describe("isWildProperty()", () => {
    it("should return false if card is not a wild", () => {
      const cardId = "v1-a2d7ffcb-f2eb-457d-baec-35aebab8a146";
      const result = isWildProperty(cardId);
      expect(result).toBe(false);
    });
    it("should return true if card is a wild", () => {
      const cardId = "v1-2209c930-3773-4b5a-a5e4-44aba608a38a";
      const result = isWildProperty(cardId);
      expect(result).toBe(true);
    });
  });
  describe("isPureWild()", () => {
    it("should return false if card is not a pure wild", () => {
      const cardId = "v1-a2d7ffcb-f2eb-457d-baec-35aebab8a146";
      const result = isPureWild(cardId);
      expect(result).toBe(false);
    });
    it("should return true if card is a pure wild", () => {
      const cardId = "v1-b76dbc82-109b-4a28-8112-4c5b23775293";
      const result = isPureWild(cardId);
      expect(result).toBe(true);
    });
  });
  describe("isSomeProperty()", () => {
    it("should return false card isnt a property, wild, or pure wild", () => {
      const cardId = "v1-a2d7ffcb-f2eb-457d-baec-35aebab8a146";
      const result = isSomeProperty(cardId);
      expect(result).toBe(false);
    });
    it("should return true if card is a property", () => {
      const cardId = "v1-2209c930-3773-4b5a-a5e4-44aba608a38a";
      const result = isSomeProperty(cardId);
      expect(result).toBe(true);
    });
    it("should return true if card is a wild", () => {
      const cardId = "v1-2209c930-3773-4b5a-a5e4-44aba608a38a";
      const result = isSomeProperty(cardId);
      expect(result).toBe(true);
    });
    it("should return true if card is a pure wild", () => {
      const cardId = "v1-b76dbc82-109b-4a28-8112-4c5b23775293";
      const result = isSomeProperty(cardId);
      expect(result).toBe(true);
    });
  });
  describe("getPropertyColor()", () => {
    it("should not work if wild property is not defined in state", () => {
      const cardId = "v1-2209c930-3773-4b5a-a5e4-44aba608a38a";
      const state = { wilds: {} };
      const color = getPropertyColor(state, cardId);
      expect(color).toBe(null);
    });
    it("should work for wild properties", () => {
      const cardId = "v1-2209c930-3773-4b5a-a5e4-44aba608a38a";
      const state = { wilds: { [cardId]: "black" } };
      const color = getPropertyColor(state, cardId);
      expect(color).toBe("black");
    });
    it("should return for normal properties", () => {
      const state = { wilds: {} };
      const cardId = "v1-eddd4527-9256-40a7-a55e-2e2a017f2e0b";
      const color = getPropertyColor(state, cardId);
      expect(color).toBe("green");
    });
    it("should return null for pure wilds", () => {
      const state = { wilds: {} };
      const cardId = "v1-b76dbc82-109b-4a28-8112-4c5b23775293";
      const color = getPropertyColor(state, cardId);
      expect(color).toBe(null);
    });
  });
});
