/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import RedeemIcon from '@mui/icons-material/Redeem';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutAction } from "@/app/data/action/auth";
import ModalLoading from "@/components/Loader/ModalLoading";

export default function profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      // Lakukan proses logout
      await logoutAction();
      // Setelah proses logout selesai, atur loading kembali menjadi false
      // (document.getElementById("logout_modal") as HTMLDialogElement).close();
      setLoading(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:!bg-primary"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/id/profil" className="active:!bg-primary">
                <PersonIcon/>
                Profil
              </a>
            </li>
            <li>
              <a className="active:!bg-primary">
                <RedeemIcon/>
                10 Points
              </a>
            </li>
            <li>
              <a className="active:!bg-primary" onClick={handleLogout}>
                <LogoutIcon />
                Keluar
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ModalLoading isOpen={loading}/>
    </>
  );
}
