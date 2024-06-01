'use client'
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavBreadcumbs({
  level1,
  level2 = "",
  level3 = "",
}: {
  level1: string;
  level2?: string;
  level3?: string;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("lang");
  
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href={{ pathname: "/home", query: { lang: query } }}>
            <HomeIcon sx={{ color: "#F5AA27" }} />
          </Link>
        </li>
        <li>
          <Link href={`/${level1.toLowerCase()}`} className="font-bold">
            {level1}
          </Link>
        </li>
        {level2 !== "" && (
          <li>
            <p className="font-bold">{level2}</p>
          </li>
        )}
        {level3 !== "" && (
          <li>
            <p className="font-bold">{level3}</p>
          </li>
        )}
      </ul>
    </div>
  );
}
