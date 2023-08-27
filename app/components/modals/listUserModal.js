"use client";

import { getUserList } from "@/app/services/getDataServices";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";
import ListItems from "../utils/listItems";
import ListSwaps from "../utils/listSwaps";

const ListUSerModal = () => {
  const { address } = UserGlobalContext();
  const [info, setInfo] = useState({});

  const [select, setSelect] = useState(0);
  useEffect(() => {
    const prueba = async () => {
      const list = await getUserList(address);
      setInfo(list);
    };

    if (address) {
      prueba();
    }
  }, [address]);

  const w =
    info.withdraw && info.swap.length > 0
      ? info.withdraw.map((data, index) => (
          <ListItems key={index} items={data} />
        ))
      : [];
  const d =
    info.deposit && info.swap.length > 0
      ? info.deposit.map((data, index) => (
          <ListItems key={index} items={data} />
        ))
      : [];
  const s =
    info.swap && info.swap.length > 0
      ? info.swap.map((data, index) => <ListSwaps key={index} items={data} />)
      : [];

  return (
    <div className="flex ">
      <div className="w-11/12 mx-auto mt-8 hModals">
        <div className="border border-2 border-sweet h-full overflow-hidden  rounded  ">
          <nav className="grid grid-cols-3 text-sweet w-full justify-around h-1/6 border-b-2 border-sweet">
            <button onClick={() => setSelect(0)}>Retiros</button>
            <button
              onClick={() => setSelect(1)}
              className="border-x-2 border-sweet"
            >
              Depositos
            </button>
            <button onClick={() => setSelect(2)}>Cambios</button>
          </nav>

          <div className="h-full pt-8 w-full relative">
            <div
              className={`w-full flex justify-between absolute  top-0 text-center text-white bg-sweet ${
                select == 0 || select == 1 ? "" : "hidden"
              }`}
            >
              <h6 className="py-2 m-0 w-4/12">Monto</h6>
              <h6 className="py-2 m-0 w-4/12 border-x-2 border-white">
                Moneda
              </h6>
              <h6 className="py-2 m-0 w-4/12">Fecha</h6>
            </div>
            <div
              className={`w-full flex justify-between absolute  top-0 text-center text-white bg-sweet ${
                select == 2 ? "" : "hidden"
              }`}
            >
              <h6 className="py-2 m-0 w-3/12">Monto enviado</h6>
              <h6 className="py-2 m-0 w-3/12 border-x-2 border-white">
                Moneda
              </h6>
              <h6 className="py-2 m-0 w-3/12 border-r-2 border-r-white">
                Monto recibido
              </h6>
              <h6 className="py-2 m-0 w-3/12">Moneda</h6>
            </div>
            <div
              className={`${
                select == 0 ? "" : "hidden"
              } h-5/6 w-full overflow-scroll`}
            >
              {w}
            </div>
            <div
              className={`${
                select == 1 ? "" : "hidden"
              } h-5/6 w-full overflow-scroll`}
            >
              {d}
            </div>
            <div
              className={`${
                select == 2 ? "" : "hidden"
              } h-5/6 w-full overflow-scroll`}
            >
              {s}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUSerModal;
