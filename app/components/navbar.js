"use client";

import Image from "next/image";
import { useBalance } from "wagmi";
import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";
import ConnectButton from "./buttons/connectButton";

const NavbarComponenet = () => {
  const { address } = UserGlobalContext();

  const [amount, setAmount] = useState("0.00$");

  const { data } = useBalance({
    address: address,
  });

  useEffect(() => {
    if (data) {
      setAmount(`${data.formatted} ${data.symbol}`);
    } else {
      setAmount("0.00");
    }
  }, [data]);
  return (
    <nav className="bg-fondThree  flex justify-center w-full z-50 maxNav">
      <div className="bg-fondThree  justify-items-center	 z-50 p-3 grid grid-cols-2	items-center container mx-auto  md:grid-cols-9 gap-x-4">
        <Image
          src="/assets/miniLogo.png"
          alt="Logo"
          width={30}
          height={30}
          className="md:hidden"
        />
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="hidden md:block col-span-2 md:col-start-2"
        />

        <div className=" col-start-2 col-end-4 md:w-full flex justify-center md:justify-end	items-center md:col-start-4 md:col-end-7">
          <span className="text-white px-2">{amount}</span>
        </div>
        <div
          className={
            "w-full pt-4 md:pt-0 col-start-1 col-end-4 md:col-start-7 md:col-end-9 flex justify-center md:justify-end"
          }
        >
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponenet;
