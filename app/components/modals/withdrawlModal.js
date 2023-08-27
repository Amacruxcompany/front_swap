"use client";

import { getBalanceDbList } from "@/app/services/getDataServices";
import { useEffect, useState } from "react";
import InputWComponent from "../utils/inputWithdrawlComponent";
import { UserGlobalContext } from "@/provider/contextProvider";

const WithdrawlComponent = ({ status }) => {
  const [data, setData] = useState([]);
  const { address } = UserGlobalContext();

  useEffect(() => {
    const generateList = async () => {
      const data = await getBalanceDbList(address);
      if (typeof data == "object") {
        setData(data);
      } else {
        setData(null);
      }
    };

    if ((address != "" && data == null) || data.length == 0) {
      generateList();
    }
  }, [address, status, data]);

  const list = data
    ? data.map((data, ind) => <InputWComponent data={data} key={ind} />)
    : "No posee Informacion";

  return (
    <div>
      <div className="flex ">
        <div className="w-11/12 mx-auto mt-8 hModals overflow-scroll">
          <ul
            className={`border border-2 border-sweet   rounded ${
              data ? "border-b-transparent" : "hAuto"
            }`}
          >
            {list}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WithdrawlComponent;
