import React, { useEffect, useState } from "react";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export default function ToastError({
  classname,
  error,
  isOpen,
  onClose,
}: {
  classname?: string;
  readonly error?: StrapiErrorsProps;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        onClose(); // Menutup toast setelah 10 detik
      }, 3500); // 3,5 detik
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Membersihkan timeout jika komponen di-unmount sebelum timeout tercapai
      }
    };
  }, [isOpen, onClose]);

  if (!error?.message) return null;
  return (
    <div className="toast toast-end">
      {isOpen && (
        <div className={`alert ${classname} p-6`}>
          {error && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white">{error?.message}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
