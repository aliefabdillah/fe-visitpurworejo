import React from "react";
import HadiahItem from "./hadiahItem";
import ShareIcon from "../shareIcon";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import Divider15 from "../divider/divider15";

export default function TukarPoin() {
  return (
    <div className="flex flex-row my-6 gap-6">
      <div className="flex flex-col w-11/12">
        <h1 className="text-3xl font-extrabold">Hadiah yang dapat ditukar:</h1>
        {Array.from({ length: 5}).map((_, index) => (
          <HadiahItem key={index}/>
        ))}
      </div>
      <div className="flex flex-col shadow-2xl p-7 w-4/12 h-fit">
        <div>
          <h1 className="text-3xl font-extrabold mb-3">Highlights</h1>
          <p className="text-xl mb-3">Point Kamu: 120</p>
          <p className="text-xl mb-3">Total Hadiah: 10</p>
          <a href="/" className="mr-2">
            <FacebookIcon sx={{ color: "#3D649F", fontSize: 30 }} />
          </a>
          <a href="/" className="mr-3">
            <TwitterIcon
              style={{
                backgroundColor: "#41AEDC",
                borderRadius: "20%",
                padding: "5px",
              }}
              sx={{
                color: "#FFFFFF",
                fontSize: 25,
              }}
            />
          </a>
          <a href="/" className="mr-3">
            <InstagramIcon
              style={{
                background: "linear-gradient(45deg, #f7b733, #8a3ab9)",
                borderRadius: "20%",
                padding: "5px",
              }}
              sx={{
                color: "#FFFFFF",
                fontSize: 25,
              }}
            />
          </a>
          <a href="/" className="mr-3">
            <WhatsAppIcon
              style={{
                background: "#089E39",
                borderRadius: "20%",
                padding: "5px",
              }}
              sx={{ color: "#FFFFFF", fontSize: 25 }}
            />
          </a>
          <a href="/">
            <LinkIcon
              style={{
                background: "#636364",
                borderRadius: "20%",
                padding: "5px",
              }}
              sx={{ color: "#FFFFFF", fontSize: 25 }}
            />
          </a>
        </div>
        <Divider15 />
        <div>
          <h1 className="text-2xl font-extrabold mb-3">Tukar Poin FAQs</h1>
          {Array.from({ length: 3 }).map((_, index) => (
            <span key={index}>
              <h3 className="text-xl font-bold">Lorem ipsum dolor sit amet consectetur.</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur. Erat amet nunc congue
                laoreet mauris. Non a risus volutpat
              </p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
