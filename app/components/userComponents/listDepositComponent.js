"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useId, useState } from "react";
import ListItemComponents from "../listItems/listItemsCompoenente";

const DepositListComponent = () => {
  const { userId, listUserData } = UserGlobalContext();

  //?estado del id del usuario
  const [user, setUser] = useState(0);
  const [data, setData] = useState([]);
  const [listData, setDataList] = useState([]);

  useEffect(() => {
    if (userId && useId != 0) {
      setUser(userId);
    } else {
      setUser(0);
    }
  }, [userId]);

  useEffect(() => {
    fetch(
      `${process.env.AMAX_URL}/api/userData/depositList?` +
        new URLSearchParams({
          userId: user,
        })
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [user, listUserData]);

  useEffect(() => {
    if (data.length > 0) {
      setDataList(data);
    } else {
      setDataList([]);
    }
  }, [data]);

  const list = listData.map((element, ind) => (
    <ListItemComponents key={ind} data={element} />
  ));

  return <div className="">{list}</div>;
};

export default DepositListComponent;
