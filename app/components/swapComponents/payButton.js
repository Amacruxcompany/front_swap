"use client";

import { getBalanceDbList } from "@/app/services/getDataServices";
import { generateSwap } from "@/app/services/swapService";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const PayButton = ({ text, btnStyle }) => {
  const { address, realSwap } = UserGlobalContext();

  const [list, setList] = useState([]);

  const swap = async () => {
    if (!realSwap.idCurrencySend) {
      return;
    }

    const show = list.filter(
      (data) =>
        realSwap.amountSend <= data.ammount &&
        data.coinName == realSwap.idCurrencySend
    );

    if (show.length <= 0) {
      return;
    }

    const data = await generateSwap(
      address,
      realSwap.idCurrencySend,
      realSwap.idCurrencyReceive,
      realSwap.amountSend,
      realSwap.amountReceive
    );
  };

  useEffect(() => {
    const generateList = async () => {
      const data = await getBalanceDbList(address);
      if (typeof data == "object") {
        setList(data);
      } else {
        setList(null);
      }
    };

    if (address != "" && (list == null || list.length == 0)) {
      generateList();
    }
  }, [address, list]);

  return (
    <button onClick={swap} className={btnStyle}>
      {text}
    </button>
  );
};

export default PayButton;
