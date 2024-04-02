import React from "react";

export default function IntroSection({
  title,
  body = `There are many variations of passages of Lorem Ipsum available, but the
  majority have suffered alteration in some form, by injected humour, or
  randomised words which dont look even slightly believable. If you are
  going to use a passage of Lorem Ipsum, you need to be sure there isnt
  anything embarrassing hidden in the middle of text.`,
  titleClass = "text-5xl text-primary mb-4",
}: {
  title: string;
  body?: string;
  titleClass?: string;
}) {
  return (
    <>
      <h1 className={`font-extrabold ${titleClass}`}>{title}</h1>
      {body.split("<br>").map((paragraph, index) => (
        <p key={index} className="font-normal text-lg">
          {paragraph}<br/><br/>
        </p>
      ))}
    </>
  );
}
