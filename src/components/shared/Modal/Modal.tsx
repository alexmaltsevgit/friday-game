import { Component, onMount, Show, onCleanup } from "solid-js";

import { closeModal, useModalStore } from "@/service/store";

import styles from "./Modal.module.scss";

export const Modal: Component = () => {
  const modalStore = useModalStore();
  return (
    <Show when={modalStore.isOpen}>
      <ModalContent />
    </Show>
  );
};

const ModalContent: Component = () => {
  const modalStore = useModalStore();

  let modalRef: HTMLDivElement;

  const onDocumentClick = (e: MouseEvent) => {
    if (!modalRef?.contains(e.target as Node)) {
      closeModal();
    }
  };

  onMount(() => document.addEventListener("click", onDocumentClick));
  onCleanup(() => document.removeEventListener("click", onDocumentClick));

  return (
    <div class={styles.root}>
      <div class={styles.modal} ref={modalRef}>
        {modalStore.component}
      </div>
    </div>
  );
};
