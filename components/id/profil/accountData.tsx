"use client";
import React, { useState } from 'react'
import WisataFavorit from './wisataFavorit';
import UlasanAccount from './ulasanAccount';
import ArtikelAccount from './artikelAccount';
import Divider15 from '../divider/divider15';
import TukarPoin from './tukarPoin';

export default function AccountData() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div
      role="tablist"
      className="tabs tabs-xs md:tabs-md xl:tabs-lg"
    >
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label="Wisata Favorit"
        checked={activeTab === 0}
        onChange={() => handleTabClick(0)}
      />
      <div role="tabpanel" className="tab-content">
        <WisataFavorit/>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Ulasan"
        checked={activeTab === 1}
        onChange={() => handleTabClick(1)}
      />
      <div role="tabpanel" className="tab-content">
        {Array.from({ length: 3}).map((_, index) => (
          <UlasanAccount key={index}/>
        ))}
        <Divider15/>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Artikel"
        checked={activeTab === 2}
        onChange={() => handleTabClick(2)}
      />
      <div role="tabpanel" className="tab-content">
        <ArtikelAccount/>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab whitespace-nowrap"
        aria-label="Tukar Poin"
        checked={activeTab === 3}
        onChange={() => handleTabClick(3)}
      />
      <div role="tabpanel" className="tab-content">
        <TukarPoin/>
      </div>
    </div>
  )
}
