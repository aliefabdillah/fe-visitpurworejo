/* eslint-disable @next/next/no-img-element */
import React from "react";

const articleData = [
  {
    img: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    title: "What is Lorem Ipsum?",
    short: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham"
  },
  {
    img: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    title: "What is Lorem Ipsum?",
    short: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham"
  },
  {
    img: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    title: "What is Lorem Ipsum?",
    short: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham"
  },
  
]

export default function ArtikelList() {
  return (
    <div className="flex gap-6 justify-between mb-16">
      {articleData.map((article, index) => (
        <div key={index} className="card card-compact bg-base-100 shadow-xl cursor-pointer">
          <a href="/" className="rounded-lg group">
            <figure >
              <img
                src={article.img}
                alt="Shoes"
                className="transition-transform transform-gpu duration-300 
                scale-100 group-hover:scale-110 group-hover:rounded-lg"
              />
            </figure>
            <div className="card-body text-ellipsis">
              <h2 className="card-title hover:underline hover:font-extrabold">{article.title}</h2>
              <p className="line-clamp-5 lg:line-clamp-4 overflow-hidden">{article.short}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
