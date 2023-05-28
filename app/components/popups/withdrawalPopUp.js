"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import ListCoinsComponent from "../listItems/listCoinsComponenet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { toast, Zoom } from "react-toastify";

const WithdrawalPopUp = () => {
  const { userId, popUpWithdral, setPopUpWithdral, address, lang } =
    UserGlobalContext();



  const { chain } = useNetwork();

  const [userList, setUserList] = useState([])

  const [network, setNetwork] = useState('')



  useEffect(() => {
    if (chain) {
      setNetwork(chain.network)
    }
  }, [chain])


  useEffect(() => {
    if (userId) {
      const getData = async () => {
        const list = await fetch(
          `${process.env.AMAX_URL}/api/allcoins?` +
          new URLSearchParams({
            userId: userId,
          }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());

        setUserList(list)
      };

      getData();
    }
  }, [userId, popUpWithdral]);


  const userPayEvent = async (data) => {

    const event = await fetch(
      `${process.env.AMAX_URL}/api/withdrawal?` +
      new URLSearchParams({
        idCurrency: data.coinName,
        address: address,
        amount: data.ammount,
        network: network
      }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())

    if (!event.data) {
      toast(event.message, { hideProgressBar: false, autoClose: 5000, type: 'error', position: 'top-right', transition: Zoom })
    } else {
      toast(lang ? 'Retiro Realizado con éxito' : 'Withdrawal Successful', { hideProgressBar: false, autoClose: 5000, type: 'success', position: 'top-right', transition: Zoom })
      await fetch(
        `${process.env.AMAX_URL}/api/withdrawlEvent?` +
        new URLSearchParams({
          userId,
          coinId: data.coinId,
          amount: data.ammount,
        }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())


      setPopUpWithdral(false)

    }
  }
  const closeEvent = () => {
    setPopUpWithdral(false);
  };

  const showList = [...userList].map((data, ind) => <ListCoinsComponent event={userPayEvent} key={ind} data={data} />)



  return (
    <div
      className={`${popUpWithdral ? "heithPopupShow" : "heithPopup"
        } z-50   fixed overflow-hidden	 bg-fondOne mt-4 py-4 border-2 rounded-2xl border-white text-center text-white`}
    >
      <div
        className="absolute top-2 right-4 text-white cursor-pointer"
        onClick={() => closeEvent()}
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <h3>Retiro</h3>
      <div className="overflow-y-scroll  w-10/12 mx-auto h-96 ">

        {showList}
      </div>
    </div>
  );
};

export default WithdrawalPopUp;
