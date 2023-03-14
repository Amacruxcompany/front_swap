import Head from 'next/head'
import { getAllListPool, getAllListImageCurrency } from '@/services/getDataServices'
import SwapComponent from '@/components/swapComponent/swapComponenet'
import { useRouter } from 'next/router'
export default function Home({data, dataAssets}) {
  const route = useRouter()

  if(!data || !dataAssets){
    route.push({
      pathname: '/404'}
    )
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto containerPersonal">
          <SwapComponent allList={data.data} allCurrency={dataAssets.data}/>
        </div>
      </main>
    </>
  )
}

//*funcion inicial propia de next para extraer siempre la lista de pools disponibles
export async function getStaticProps(context) {

  const res = await getAllListPool()
  const resAssets = await getAllListImageCurrency()

  if(!res || !resAssets){
      return   {
        redirect: {
          destination: '/404',
        },
    }
  }

  const data = await res.json()
  const dataAssets = await resAssets.json()
  
  return  { 
      props: {
          data,
          dataAssets
      }
  }
}