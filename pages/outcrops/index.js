import React from "react";
import Link from "next/link";

const Outcrops = ({ outcrops }) => {
  return (
    <>
      <h1>List of Outcrops</h1>
      <ul>
        {outcrops.map((outcrop, index) => (
          <li key={index}>
            <Link href={`/outcrops/${index}`}>{outcrop.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Outcrops;
