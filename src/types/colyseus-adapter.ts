import { ArraySchema, MapSchema } from "@colyseus/schema";

type PlainObjectFromMapSchema<T> = T extends MapSchema<infer R>
  ? Record<string, R>
  : never;

type PlainArrayFromArraySchema<T> = T extends ArraySchema<infer R>
  ? R[]
  : never;

export type ColyseusPrimitive =
  | undefined
  | null
  | number
  | string
  | boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  | Function;

export type ColyseusState = {
  [Key: string]: MapSchema | ArraySchema | ColyseusPrimitive | ColyseusState;
};

export type PlainStateFromColyseusState<T extends ColyseusState> = {
  [Key in keyof T]: T[Key] extends MapSchema
    ? PlainObjectFromMapSchema<T[Key]>
    : T[Key] extends ArraySchema
    ? PlainArrayFromArraySchema<T[Key]>
    : T[Key] extends ColyseusState
    ? PlainStateFromColyseusState<T[Key]>
    : T[Key] extends ColyseusPrimitive
    ? T[Key]
    : never;
};
