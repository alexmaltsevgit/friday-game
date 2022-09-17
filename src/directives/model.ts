import { createRenderEffect } from "solid-js";

// https://www.solidjs.com/docs/latest/api#use___
export const model = (el, value) => {
  if (!value) return;

  const [field, setField] = value();
  createRenderEffect(() => (el.value = field() ?? ""));
  el.addEventListener("input", (e) => setField(e.target.value));
};
