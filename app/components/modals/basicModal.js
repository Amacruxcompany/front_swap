"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";
import DepositModal from "./despositModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import WithdrawlComponent from "./withdrawlModal";
import ListUSerModal from "./listUserModal";

const BasicModal = ({ showme }) => {
  const [modalS, setModalS] = useState({ status: false, type: "loading" });
  const [first, setFirst] = useState(false);
  const { modal, setModal, poolArray, chain } = UserGlobalContext();

  useEffect(() => {
    setModalS(modal);
  }, [modal, setModal]);

  useEffect(() => {
    if (poolArray.length > 0 && modalS.status == true) {
      setFirst(true);
    }
  }, [poolArray, modalS]);
  return (
    <div
      className={`modal box ${
        modalS.status && chain ? "show" : first ? "close" : "hidden"
      }  bg-white  p-2 rounded-xl text-xs break-all	`}
    >
      <div className="w-full h-full relative">
        <button
          className="absolute right-2 top-0"
          onClick={() => setModal({ ...modalS, status: false })}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>

        {modalS.type == "Deposito" ? (
          <DepositModal listCoin={modalS.despositData} />
        ) : modalS.type == "Retiro" ? (
          <WithdrawlComponent status={modalS.status} />
        ) : modalS.type == "List" ? (
          <ListUSerModal />
        ) : (
          "LOADING"
        )}
      </div>
    </div>
  );
};

export default BasicModal;
