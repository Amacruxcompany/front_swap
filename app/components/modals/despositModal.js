"use client";

import { useEffect, useState } from "react";
import InputComponent from "../utils/inputComponent";

const DepositModal = ({ listCoin }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (listCoin) {
      setData(listCoin);
    }
  }, [listCoin]);

  const list =
    data && data.length > 0
      ? data.map((data, ind) => <InputComponent data={data} key={ind} />)
      : "No posee Informacion";

  return (
    <div className="flex ">
      <div className="w-11/12 mx-auto mt-8 hModals overflow-scroll">
        <ul
          className={`border border-2 border-sweet ${
            data && data.length > 0 ? "border-b-transparent" : "h-40"
          } rounded`}
        >
          {list}
        </ul>
      </div>
    </div>
  );
};

export default DepositModal;
