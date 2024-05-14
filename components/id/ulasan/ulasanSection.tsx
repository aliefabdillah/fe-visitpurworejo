"use client";
import React, { useEffect, useState } from "react";
import UlasanForm from "./ulasanForm";
import UlasanList from "./ulasanList";
import { decryptUserId } from "@/components/lib/crypto";
import Cookies from "js-cookie";
import LoginRequired from "../response/LoginRequired";

export default function UlasanSection() {
  const [idUser, setIdUser] = useState<number | null>(null);

  useEffect(() => {
    const handleCookiesChange = () => {
      const userSession = Cookies.get("id");
      if (userSession) {
        decryptUserId(userSession).then((id) => setIdUser(id));
      } else {
        setIdUser(null);
      }
    };

    handleCookiesChange(); // Check cookies initially

    const interval = setInterval(() => {
      handleCookiesChange();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4">
      <h1 className="text-4xl font-bold">Ulasan (40)</h1>
      {idUser ? (
        <UlasanForm />
      ) : (
        <LoginRequired/>
      )}

      <UlasanList />
    </div>
  );
}
