import { createStore } from "solid-js/store";
import { Component } from "solid-js";

type ModalStore = {
  isOpen: boolean;
  component?: Component;
};

const [modalStore, setModalStore] = createStore<ModalStore>({ isOpen: false });

type OpenModalProps = {
  component: Component;
};

export const openModal = (p: OpenModalProps) =>
  setModalStore({ isOpen: true, component: p.component });

export const closeModal = () =>
  setModalStore({ isOpen: false, component: null });

export const useModalStore = () => modalStore;
