"use client";
import React from "react";
import { useState } from "react";
import UlasanData from "./ulasanData";
export default function UlasanList() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div
      role="tablist"
      className="tabs tabs-bordered tabs-xs md:tabs-md xl:tabs-lg"
    >
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Best"
        checked={activeTab === 0}
        onChange={() => handleTabClick(0)}
      />
      <div role="tabpanel" className="tab-content">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="my-5">
            <UlasanData />
            <UlasanData className="ml-24 my-5" />
          </div>
        ))}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Newest"
        checked={activeTab === 1}
        onChange={() => handleTabClick(1)}
      />
      <div role="tabpanel" className="tab-content">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="my-5">
            <UlasanData />
            <UlasanData className="ml-24 my-5" />
          </div>
        ))}
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Oldest"
        checked={activeTab === 2}
        onChange={() => handleTabClick(2)}
      />
      <div role="tabpanel" className="tab-content">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="my-5">
            <UlasanData />
            <UlasanData className="ml-24 my-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
