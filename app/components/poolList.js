"use client";

import Image from "next/image";

const PoolListComponent = ({ searchPool }) => {
  const imagesArray = searchPool.assets
    ? searchPool.assets.map((element, ind) => (
        <Image
          src={`https://cryptoicons.org/api/icon/${element.toLowerCase()}/200`}
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
