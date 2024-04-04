import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FlagIcon from "@mui/icons-material/Flag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ModalReport from "./modalReport";
import UlasanForm from "./ulasanForm";

export default function UlasanData({ className }: { className?: string }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div className={`flex flex-row gap-3 ${className}`}>
      <AccountCircleIcon sx={{ fontSize: 100, color: "gray" }} />
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold">John Doe</p>
            <p className="font-extralight">Day, dd/mm/yy</p>
          </div>
          <button
            className="font-bold text-error"
            onClick={() =>
              (
                document.getElementById("report_modal")! as HTMLDialogElement
              ).showModal()
            }
          >
            <FlagIcon className="mr-1" />
            Laporkan
          </button>
          <ModalReport/>
          
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Urna porttitor nulla venenatis
          adipiscing quis dapibus facilisis morbi etiam. Pharetra arcu as metus
          pharetra ut eget lectus. Iaculis varius proin tellus interdum ante ut
          arcu. Neque nam sem sed in tortor et. Quis laoreet auctor blandit
          augue euismod vestibulum gravida diam. Amet vitae at habitasse proin
          cras in ut odio nunc.
        </p>
        <div className="flex flex-row gap-6">
          <button className="font-bold ">
            <ThumbUpIcon className="mr-2" />
            (10)
          </button>
          <button className="font-bold ">
            <ThumbDownIcon className="mr-2" />
            (10)
          </button>
          <button className="font-bold text-primary" onClick={toggleReplyForm}>Balas</button>
        </div>
        { showReplyForm && (
          <div className="">
            <UlasanForm/>
          </div>
        )}
      </div>
    </div>
  );
}
