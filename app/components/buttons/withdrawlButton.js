"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { UserGlobalContext } from "@/provider/contextProvider";

const WithdrawlButtonComponent = ({ options, close }) => {
  //? Estados
  const [init, setInit] = useState(true);

  //? exportaciones funcioones wallets
  const { chain } = useNetwork();
  const { address, setPopUpWithdral } = UserGlobalContext();

  const withdrwal = async () => {
    if (!address || !chain) {
      return;
    }
    close(false);
    setPopUpWithdral(true);
  };

  useEffect(() => { }, [chain]);

  return (
    <button
      onClick={withdrwal}
      className={`optionButton transition-all	duration-500 bg-fondTwo text-white flex items-center justify-center border-2 border-intColorOne w-12 h-12 cursor-pointer	 rounded-full	fixed ${options ? "bottom-20" : "bottom-4"
        }  right-4`}
    >
      <FontAwesomeIcon icon={faArrowAltCircleUp} />
    </button>
  );
};

export default WithdrawlButtonComponent;
