"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const OptionsComponent = () => {
  const { poolArray, setGroup } = UserGlobalContext();

  const [pool, setPool] = useState([
    {
      poolId: 18,
      poolName: "BNB/BTC",
      assets: ["BNB", "BTC"],
    },
  ]);

  const [value, setValue] = useState("Selecciona un pool");

  const [show, setShow] = useState(false);

  const newPool = (e) => {
    const filterPool = pool.filter((data) => data.poolName == e);
    setGroup(filterPool[0]);
    setValue(e);
    setShow(false);
  };

  const showList = () => {
    setValue("");
    setShow(!show);
  };

  useEffect(() => {
    if (poolArray.length > 0 && typeof poolArray != "string") {
      setPool(poolArray);
      setGroup(poolArray[0]);
      setValue(poolArray[0].poolName);
    }
  }, [poolArray, setGroup]);

  const filterPool =
    value != "" && value != "Selecciona un pool"
      ? pool.filter((data) =>
          data.poolName.toLowerCase().includes(value.toLowerCase())
        )
      : pool;

  return (
    <div className="relative mx-auto w-11/12">
      <input
        id="search"
        value={value}
        className="border text-xs	font-semibold text-sweet border-sweet rounded w-full mx-auto mb-2 border-2 h-8 px-2 focus:border-sweet"
        onChange={(e) => setValue(e.target.value)}
        onClick={() => showList()}
      />
      <div className="absolute text-xs end-4 top-2 text-sweet px-1 rounded">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <ul
        className={`${
          show ? "" : "hidden"
        } h-40 overflow-y-scroll	border border-sweet border-2 border-t-0 rounded-b list-none absolute w-full z-20 bg-white top-7`}
      >
        {filterPool.map((data, ind) => (
          <li
            onClick={() => newPool(data.poolName)}
            className="text-sweet text-xs py-2 pl-2 hover:bg-gray-200	cursor-pointer"
            key={ind}
          >
            {data.poolName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsComponent;
