import { ArraySchema, MapSchema } from "@colyseus/schema";

import {
  ColyseusPrimitive,
  ColyseusState,
  PlainStateFromColyseusState,
} from "@/types";

const isColyseusPrimitive = (value: unknown): value is ColyseusPrimitive =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  typeof value === "undefined" ||
  typeof value === "function" ||
  value === null;

const isMapSchema = (value: unknown): value is MapSchema =>
  typeof value === "object" && value !== null && "get" in value;

const isArraySchema = (value: unknown): value is ArraySchema =>
  typeof value === "object" && value !== null && "splice" in value;

const plainArrayFromArraySchema = <T>(value: ArraySchema<T>) => value.toArray();

const plainObjectFromMapSchema = <T>(value: MapSchema<T>) => value.toJSON();

export const mapColyseusStateToPlainState = <T extends ColyseusState>(
  colyseusState: T
) => {
  const resultingPlainState = {};

  Object.entries(colyseusState).forEach(([key, value]) => {
    if (isColyseusPrimitive(value)) {
      resultingPlainState[key] = value;
      return;
    }

    if (isMapSchema(value)) {
      resultingPlainState[key] = plainObjectFromMapSchema(value);
      return;
    }

    if (isArraySchema(value)) {
      resultingPlainState[key] = plainArrayFromArraySchema(value);
      return;
    }

    // assume it is nested object
    resultingPlainState[key] = mapColyseusStateToPlainState(value);
  });

  return resultingPlainState as PlainStateFromColyseusState<T>;
};
