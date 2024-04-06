import React from "react";

import EditProfilForm from "./editProfilForm";
import Divider15 from "../divider/divider15";
export default function EditProfil() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-extrabold text-5xl">Edit Profil</p>
      <p className="text-xl">
        Lorem ipsum dolor sit amet consectetur. Auctor ullamcorper odio nullam
        mattis pharetra at malesuada enim.
      </p>
      <EditProfilForm/>
    </div>
  );
}
