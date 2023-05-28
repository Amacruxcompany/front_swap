"use client";

const ListAllSwapsComponent = ({ data }) => {
    return (
        <div className="py-2 grid grid-cols-4 text-center items-center w-10/12 mx-auto">
            <div className="px-2  border-4 border-x-indigo-500 border-y-transparent text-white ">

                {data.currencySend}
            </div>
            <div className="  text-white text-xs	"> {data.amountSend}</div>
            <div className=" text-white px-2 border-4 border-x-indigo-500  border-y-transparent">
                {data.currencyRecibe}
            </div>
            <div className="  text-white text-xs"> {data.amountRecibe}</div>
        </div>
    );
};

export default ListAllSwapsComponent;
