import React from "react";
import HomeIcon from '@mui/icons-material/Home';

export default function NavBreadcumbs({ level1, level2 = "" }: { level1: string, level2?: string}) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <a href="/id/home">
            <HomeIcon sx={{ color: "#F5AA27" }}/>
          </a>
        </li>
        <li>
          <a href={`/id/${level1}`} className="font-bold">
            {level1}
          </a>
        </li>
        {level2 !== "" && (
          <li>
            <p className="font-bold">
              {level2}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
