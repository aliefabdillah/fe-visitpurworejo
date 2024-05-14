"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchModal() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <dialog id="search_modal" className="modal modal-middle">
      <div className="modal-box">
        <h3 className="text-lg text-center mb-4 font-bold">Cari Wisata</h3>
        <input
          className="input input-bordered w-10/12 focus:!outline-secondary"
          placeholder="Nama Wisata"
          onChange={handleSearchValue}
        />
        <Link
          onClick={() => (document.getElementById("search_modal")! as HTMLDialogElement).close()}
          href={{ pathname: "/wisata", query: {search: searchValue} }}
          className="btn w-2/12 bg-primary text-white hover:bg-neutral"
        >
          Cari
        </Link>
      </div>
      <form method="dialog" className="modal-backdrop">
        {/* if there is a button, it will close the modal */}
        <button>Close</button>
      </form>
    </dialog>
  );
}
