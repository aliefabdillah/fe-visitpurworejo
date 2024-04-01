import React from "react";

export default function IntroSection({ title, body }: { title: string, body?: string}) {
  return (
    <>
      <h1 className="text-5xl font-extrabold text-primary mb-4">{title}</h1>
      <p className="font-normal text-lg">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which dont look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isnt
        anything embarrassing hidden in the middle of text.
      </p>
    </>
  );
}
