import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import LinkIcon from "@mui/icons-material/Link";

export default function ShareIcon() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl">Bagikan:</p>
      <div className="grid grid-cols-3 md:grid-cols-6 items-center">
        <a href="/" className="mr-2">
          <FacebookIcon sx={{ color: "#3D649F", fontSize: 55 }} />
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
              fontSize: 45,
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
              fontSize: 45,
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
            sx={{ color: "#FFFFFF", fontSize: 45 }}
          />
        </a>
        <a href="/" className="mr-3">
          <MailIcon
            style={{
              background: "#A21C1C",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{ color: "#FFFFFF", fontSize: 45 }}
          />
        </a>
        <a href="/">
          <LinkIcon
            style={{
              background: "#636364",
              borderRadius: "20%",
              padding: "5px",
            }}
            sx={{ color: "#FFFFFF", fontSize: 45 }}
          />
        </a>
      </div>
    </div>
  );
}
