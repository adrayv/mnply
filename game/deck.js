import { v4 as uuidv4 } from "uuid";

const properties = {
  red: {
    value: 3,
    rentTiers: [2, 3, 6],
  },
  yellow: {
    value: 3,
    rentTiers: [2, 4, 6],
  },
  mint: {
    value: 2,
    rentTiers: [1, 2],
  },
  orange: {
    value: 2,
    rentTiers: [1, 3, 5],
  },
  green: {
    value: 4,
    rentTiers: [2, 4, 7],
  },
  blue: {
    value: 4,
    rentTiers: [3, 8],
  },
  purple: {
    value: 2,
    rentTiers: [1, 2, 4],
  },
  black: {
    value: 2,
    rentTiers: [1, 2, 3, 4],
  },
  sky: {
    value: 1,
    rentTiers: [1, 2, 3],
  },
  brown: {
    value: 1,
    rentTiers: [1, 2],
  },
};

export const makeProperty = (color, value) => ({
  id: uuidv4(),
  type: "property",
  value,
  property: {
    color,
  },
});

export const makeProperties = () => {
  Object.entries(properties).map(([color, { value, rentTiers }]) =>
    rentTiers.map(() => makeProperty(color, value))
  );
};

export const getRentTier = (property) => properties[property.color];

console.log(makeProperties());
