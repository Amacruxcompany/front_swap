'use client'

import WagmiProvider from "./wagmi";

const RootProvider = ({ children }) => {
    return( 
        <WagmiProvider>
            {children}
        </WagmiProvider>)
    
};


export default RootProvider;