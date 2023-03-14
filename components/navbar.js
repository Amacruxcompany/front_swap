import Image from "next/image"
import logo from "@/assets/miniLogo.png"
import logo2 from "@/assets/logo.png"
import webPage from "@/assets/icons/webPage.png"
import option from "@/assets/icons/options.png"
import ConnectWalletButton from "@/shared/conectWalledButton"

export default function NavBar(){
    return(
        <nav className="bg-fondThree flex justify-center w-full z-50">
            <div className="bg-fondThree z-50 p-3 flex justify-around	items-center container mx-auto md:grid grid-cols-9 gap-x-4">
            <Image src={logo} alt="Logo" width={30} height={30} className='md:hidden'/>
            <Image src={logo2} alt="Logo" width={300} height={300} className='hidden md:block col-span-2 col-start-2'/>

            <div className="w-7/12 md:w-full flex justify-center md:justify-end	items-center col-start-4 col-end-7"> 
                <span className="text-white px-2">302.5$</span>
                <Image src={webPage} alt="world-icon" width={20} height={20} className='mr-3 md:cursor-pointer hover:rotate-180 transition-all	duration-500 ease-in'/>
                <Image src={option} alt="option-icon" width={20} height={20}  className='mr-3 md:cursor-pointer hover:rotate-180 transition-all	duration-500 ease-in'/>
            </div>
                <ConnectWalletButton style={'border-intColorOne hover:bg-intColorOne hover:text-black transition-all	duration-300 ease-in rounded-full border-2 px-3 py-2 text-white w-4/12 md:w-full col-start-7 col-end-9 col-end-10 text-xs md:text-lg md:cursor-pointer'}/>
            </div>
        </nav>
    )
}