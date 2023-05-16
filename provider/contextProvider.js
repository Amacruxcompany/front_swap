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
  popUpWithdral: true,
  counter: 0,
  currencys: [],
  listUserData: false,
  userId: 0,
});

export function GlobalContextProvider({ children }) {
  const [userId, setUserId] = useState(0);

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
    amountSend: "0.00",
    amountReceive: "0.00",
    price: "0",
    slippage: "0",
    fee: "0",
    priceQuote: "0",
    priceBase: "0",
  });

  //direccion de la wallet
  const [address, setAddress] = useState("");

  //condicional para mostrar el popup para pagar
  const [popUpPay, setPopUpPay] = useState(false);

  //condicional para mostrar el popup para pagar
  const [popUpWithdral, setPopUpWithdral] = useState(false);

  // arreglo de monedas disponibles
  const [payArray, setPayArray] = useState([]);

  //arreglo de todas las currencys posibles
  const [currencys, setCurrencys] = useState([]);

  //estado del cronometro de peticiones

  const [counter, setCounter] = useState(0);

  //?contexto del popup de la lista del usuario
  const [listUserData, setListUserData] = useState(false);
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
        popUpWithdral,
        setPopUpWithdral,
        counter,
        setCounter,
        listUserData,
        setListUserData,
        userId,
        setUserId,
      }}
    >
      {children}
    </GlobalContextObj.Provider>
  );
}

export const UserGlobalContext = () => useContext(GlobalContextObj);
