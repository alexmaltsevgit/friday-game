import { createRenderEffect } from "solid-js";

export type ModelValue = [() => string, (v: string) => void];

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: ModelValue;
    }
  }
}

// https://www.solidjs.com/docs/latest/api#use___
export const model = (el, value: () => ModelValue) => {
  if (!value) return;

  const [field, setField] = value();
  createRenderEffect(() => (el.value = field() ?? ""));
  el.addEventListener("input", (e) => setField(e.target.value));
};
