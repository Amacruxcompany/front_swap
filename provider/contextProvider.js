"use client";

import { createContext, useContext, useState } from "react";

const GlobalContextObj = createContext({
  poolArray: [],
  swap: {},
  group: {},
  index: 0,
  modal: { status: false },
  chain: {},
  refresh: false,
  address: "",
  graph: false,
  realSwap: {},
});

export function GlobalContextProvider({ children }) {
  const [poolArray, setPoolArray] = useState([]);
  const [group, setGroup] = useState({});
  const [swap, setSwap] = useState({});
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState({
    status: false,
  });
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState({});

  const [graph, setGraph] = useState(false);

  const [realSwap, setRealSwap] = useState({});

  return (
    <GlobalContextObj.Provider
      value={{
        poolArray,
        setPoolArray,
        swap,
        setSwap,
        group,
        setGroup,
        index,
        setIndex,
        modal,
        setModal,
        chain,
        setChain,
        refresh,
        setRefresh,
        address,
        setAddress,
        graph,
        setGraph,
        realSwap,
        setRealSwap,
      }}
    >
      {children}
    </GlobalContextObj.Provider>
  );
}

export const UserGlobalContext = () => useContext(GlobalContextObj);
