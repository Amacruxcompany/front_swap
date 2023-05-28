"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useId, useState } from "react";
import ListItemComponents from "../listItems/listItemsCompoenente";
import Spinner from "../spinnersComponents/spinner";

const DepositListComponent = () => {
  const { userId, listUserData, lang } = UserGlobalContext();

  //?estado del id del usuario
  const [user, setUser] = useState(0);
  const [data, setData] = useState([]);
  const [listData, setDataList] = useState([]);
  const [waitData, setWaitData] = useState(true)

  useEffect(() => {
    if (userId && useId != 0) {
      setUser(userId);
    } else {
      setUser(0);
    }
  }, [userId]);

  useEffect(() => {
    setWaitData(true)
    fetch(
      `${process.env.AMAX_URL}/api/userData/depositList?` +
      new URLSearchParams({
        userId: user,
      })
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(res => setWaitData(false));
  }, [user, listUserData]);

  useEffect(() => {
    if (data.length > 0) {
      setDataList(data);

    }
  }, [data]);

  const list = listData.map((element, ind) => (
    <ListItemComponents key={ind} data={element} />
  ));

  return (
    <div className="border-4 border-indigo-500/75  rounded-md	py-2">
      <div className="grid grid-cols-3 items-center text-center w-10/12 mx-auto text-white">
        <span>{lang ? 'moneda' : 'currency'}</span>
        <span>{lang ? 'monto' : 'amount'}</span>
        <span>{lang ? 'fecha' : 'date'}</span>
      </div>
      {waitData ? <Spinner /> : list}
    </div>
  );
};

export default DepositListComponent;
