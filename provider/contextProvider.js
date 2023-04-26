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
  popUpPay: false,
  payArray: [],
});

export function GlobalContextProvider({ children }) {
  //poolArray de la lista de todos los pools
  const [poolArray, setPoolArray] = useState([]);

  //booleano para mostrar el popupo
  const [popUpPool, setPopUpPool] = useState(false);

  //objeto que define el pool actual
  const [pool, setPool] = useState({
    poolName: "BNB/BTC",
    assets: ["BNB", "BTC"],
    poolId: 18,
  });

  //objeto del evento swap
  const [swap, setSwap] = useState({
    idCurrencySend: "BNB",
    idCurrencyReceive: "BTC",
    amountSend: 0.0,
    amountRecibe: 0.0,
    currencys: [],
  });

  //direccion de la wallet
  const [address, setAddress] = useState("");

  //condicional para mostrar el popup para pagar
  const [popUpPay, setPopUpPay] = useState(false);

  // arreglo de monedas disponibles
  const [payArray, setPayArray] = useState([]);

  //arreglo de todas las currencys posibles
  const [currencys, setCurrencys] = useState([]);

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
        popUpPay,
        setPopUpPay,
        payArray,
        setPayArray,
        currencys,
        setCurrencys,
      }}
    >
      {children}
    </GlobalContextObj.Provider>
  );
}

export const UserGlobalContext = () => useContext(GlobalContextObj);
