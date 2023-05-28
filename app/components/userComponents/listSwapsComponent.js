"use client";

import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useId, useState } from "react";
import ListAllSwapsComponent from "../listItems/listAllSwapsComponenet";
import Spinner from "../spinnersComponents/spinner";

const SwapListComponent = () => {
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
            `${process.env.AMAX_URL}/api/userData/swapList?` +
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
        <ListAllSwapsComponent key={ind} data={element} />
    ));

    return (
        <div className="border-4 border-indigo-500/75  rounded-md	py-2">
            <div className="grid grid-cols-4 items-center text-center w-10/12 mx-auto text-white">
                <span>{lang ? 'M. recibida' : 'R. currency'}</span>
                <span>{lang ? 'monto' : 'amount'}</span>
                <span>{lang ? 'M enviada' : 'C. sent'} </span>
                <span>{lang ? 'recibido' : 'received'}</span>
            </div>
            {waitData ? <Spinner /> : list}
        </div>
    );
};

export default SwapListComponent;
