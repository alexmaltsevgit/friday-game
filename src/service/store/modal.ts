import { createStore } from "solid-js/store";
import { JSX } from "solid-js";

type ModalStore =
  | {
      isOpen: true;
      component: JSX.Element;
    }
  | {
      isOpen: false;
      component?: null;
    };

const [modalStore, setModalStore] = createStore<ModalStore>({ isOpen: false });

type OpenModalProps = {
  component: JSX.Element;
};

export const openModal = (p: OpenModalProps) =>
  setModalStore({ isOpen: true, component: p.component });

export const closeModal = () =>
  setModalStore({ isOpen: false, component: null });

export const useModalStore = () => modalStore;
