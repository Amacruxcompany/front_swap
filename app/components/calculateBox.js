import { UserGlobalContext } from "@/provider/contextProvider";
import { useEffect, useState } from "react";

const CalculatedBox = () => {
  const { swap, lang } = UserGlobalContext()

  const [data, setData] = useState({})

  useEffect(() => {
    if (swap) {
      setData(swap)
    }
  }, [swap])


  return <div className="w-10/12 mx-auto flex flex-col bg-intColorTwo py-2 text-xs	rounded-xl">
    <div className="grid grid-cols-2  text-white py-1 px-2"><span>{lang ? 'Comisión' : 'Commission'}:</span>   <span className="text-end break-words	">{data.fee}</span></div>
    <div className="grid grid-cols-2  text-white py-1 px-2"><span> {lang ? 'Precio' : 'Price'}:</span>   <span className="text-end break-words	">{data.price}</span></div>
    <div className="grid grid-cols-2  text-white py-1 px-2"><span>{lang ? 'Monto recibido' : 'Amount received'}:</span> <span className="text-end break-words	">{data.amountReceive}{data.idCurrencyReceive}</span></div>
    <div className="grid grid-cols-2  text-white py-1 px-2"><span>{lang ? 'Monto enviado' : 'Amount send'}:</span>  <span className="text-end break-words	">{data.amountSend}{data.idCurrencySend}</span></div>

  </div>;
};

export default CalculatedBox;
