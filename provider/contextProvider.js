"use client";

import { createContext, useContext, useState } from "react";

const GlobalContextObj = createContext({
  poolArray: [],
  showPopUpPool: false,
  pool: {
    poolName: "BNB/BTC",
    assets: ["BNB", "BTC"],
    poolId: 18,
  },
  swap: {
    idCurrencySend: "BNB",
    idCurrencyReceive: "BTC",
    amountSend: 0.0,
    amountRecibe: 0.0,
  },
  address: "",
});

export function GlobalContextProvider({ children }) {
  const [poolArray, setPoolArray] = useState([]);
  const [popUpPool, setPopUpPool] = useState(false);
  const [pool, setPool] = useState({
    poolName: "BNB/BTC",
    assets: ["BNB", "BTC"],
    poolId: 18,
  });
  const [swap, setSwap] = useState({
    idCurrencySend: "BNB",
    idCurrencyReceive: "BTC",
    amountSend: 0.0,
    amountRecibe: 0.0,
  });

  const [address, setAddress] = useState("");
  return (
    <GlobalContextObj.Provider
      value={{
        poolArray,
        setPoolArray,
        popUpPool,
        setPopUpPool,
        pool,
        setPool,
        swap,
        setSwap,
        address,
        setAddress,
      }}
    >
      {children}
    </GlobalContextObj.Provider>
  );
}

export const UserGlobalContext = () => useContext(GlobalContextObj);
