import { FC, ReactNode, useCallback, useMemo } from 'react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    //TorusWalletAdapter,
    SlopeWalletAdapter,
    SolongWalletAdapter,
    BackpackWalletAdapter,
    BraveWalletAdapter,
    Coin98WalletAdapter,
    CoinbaseWalletAdapter,
    NightlyWalletAdapter,
    TrustWalletAdapter, 
    //WalletConnectWalletAdapter,
    XDEFIWalletAdapter
} from '@solana/wallet-adapter-wallets';
require('@solana/wallet-adapter-react-ui/styles.css');


const WalletContextProvider = ({ children }) => {
    const network = process.env.REACT_APP_WALLET_ADAPTER_NETWORK == 'dev' ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;
    //quicknode hopefully works better
    //const endpoint = useMemo(() => "https://spring-frosty-snowflake.solana-mainnet.discover.quiknode.pro/5584f3ace79637af8f83a6f135554af9e0f0ffca/", [network]);
    
    const endpoint = useMemo(() => "https://skilled-fabled-snowflake.solana-mainnet.discover.quiknode.pro/3abffd7110cf3cf8e18084f89dbeb290b3c16362/", [network]);
//use this for production
    //const endpoint = useMemo(() => "https://solana-mainnet.g.alchemy.com/v2/GatLx4SVsTijZoDo9WJHKMos3lxr5jVX", [network]); //clusterApiUrl(network)
    //use this for testing
    //const endpoint = useMemo(() => "https://solana-mainnet.g.alchemy.com/v2/7ZjtJXlqW6cCksjr6I0aXETPeoSHzEWn", [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new BackpackWalletAdapter(),
            new SolflareWalletAdapter(),
            //new TorusWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolongWalletAdapter(),
            new BraveWalletAdapter(),
            new Coin98WalletAdapter(),
            new CoinbaseWalletAdapter(),
            new NightlyWalletAdapter(),
            new TrustWalletAdapter(), 
            //new WalletConnectWalletAdapter(),
            new XDEFIWalletAdapter()
        ],
        [network]
    );

    const onError = useCallback(
        (error) => {
            console.error(error);
        },
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;