import React from 'react';

export default function CardSkeleton({ classname, totalItem }: { classname: string, totalItem: number }) {
  return (
    <>
      {Array.from({ length: totalItem }).map((_, index) => (
        <div key={index} className={`skeleton ${classname}`}></div>
      ))}
    </>
  );
}
