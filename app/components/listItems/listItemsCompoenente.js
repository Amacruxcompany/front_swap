"use client";

import { useEffect } from "react";

const ListItemComponents = ({ data }) => {
  return (
    <div className="flex justify-around w-full">
      <div> {data.currency}</div>
      <div> {data.ammount}</div>
      <div>{data.date.split("T")[0]}</div>
    </div>
  );
};

export default ListItemComponents;
