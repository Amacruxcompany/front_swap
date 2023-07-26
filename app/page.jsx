import SwapComponent from "@/app/components/swapComponenet";



//* Datos iniciales para las vistas
async function getData() {
    const pool = await fetch(`${process.env.AMAX_URL}/api/listpool`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());


  

    return pool
}


// async function getCurrencys(){
//   const currencys = await fetch(`${process.env.AMAX_URL}/api/listCurrencys`,{
//     method:"GET", headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());

//   return currencys
// }

export default async function Home() {
  
   const data = await getData()
   
  //  const list = await getCurrencys()

  return (
      <main>
        <div className="mx-auto containerPersonal">
          <SwapComponent pools={data.data} />
          <br /><br /><br />
        </div>
      </main>
  );
}


