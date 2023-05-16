"use client";

import Image from "next/image";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const PoolListComponent = ({ searchPool }) => {
  const { currencys } = UserGlobalContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (currencys) {
      if (currencys.length > 0) {
        setData(currencys);
      }
    }
  }, [currencys]);

  const imagesArray = searchPool.assets
    ? searchPool.assets.map((element, ind) => (
        <Image
          src={
            data.length > 0
              ? data.filter((data) => data.symbol == element.toLowerCase())[0]
                  ?.image
                ? data.filter((data) => data.symbol == element.toLowerCase())[0]
                    ?.image
                : `/assets/nodata.jpg`
              : "https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"
          }
          key={ind}
          alt={element}
          width={20}
          height={20}
        />
      ))
    : null;
  return (
    <div className="absolute flex w-12 justify-between top-2 right-4">
      {imagesArray}
    </div>
  );
};

export default PoolListComponent;
