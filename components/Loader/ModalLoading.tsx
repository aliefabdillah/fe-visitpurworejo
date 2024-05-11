import React from "react";

export default function ModalLoading({ isOpen }: {isOpen: boolean}) {
  return (
    <dialog id="loading_modal" className={`modal modal-middle ${isOpen ? "modal-open": ""}`}>
      <div className="bg-white w-full h-full flex items-center justify-center">
        <div className="h-28 w-28 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    </dialog>
  );
}
