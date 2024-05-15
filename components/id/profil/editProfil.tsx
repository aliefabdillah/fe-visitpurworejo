import React from "react";

import EditProfilForm from "./editProfilForm";
import Divider15 from "../divider/divider15";
export default function EditProfil() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-extrabold text-5xl">Edit Profil</p>
      <p className="text-xl">
        Di sini, Anda dapat mengubah informasi profil untuk memastikan
        bahwa akun Anda tetap terkini dan sesuai dengan kebutuhan Anda. Silakan
        perbarui informasi di bawah ini sesuai dengan preferensi Anda.
      </p>
      <EditProfilForm />
    </div>
  );
}
