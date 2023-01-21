import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'next/router';
import { MetaMaskProvider } from 'metamask-react';
import Meta from '../components/Meta';
import UserContext from '../components/UserContext';
import { useEffect, useRef } from 'react';

import { avalanche, avalancheFuji } from '@wagmi/core/chains'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
 
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
    [avalancheFuji, avalanche],
    [
      infuraProvider({ apiKey: 'a7f7989fbb424a1989511ec922db7b38' }),
      publicProvider(),
    ],
)

// Set up client
const client = createClient({
	autoConnect: true,
	connectors: [
	  new MetaMaskConnector({ chains }),
	  // new CoinbaseWalletConnector({
	  //   chains,
	  //   options: {
	  //     appName: 'wagmi',
	  //   },
	  // }),
	  // new WalletConnectConnector({
	  //   chains,
	  //   options: {
	  //     qrcode: true,
	  //   },
	  // }),
	  // new InjectedConnector({
	  //   chains,
	  //   options: {
	  //     name: 'Injected',
	  //     shimDisconnect: true,
	  //   },
	  // }),
	],
	provider,
	webSocketProvider,
  })


function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const pid = router.asPath;
	const scrollRef = useRef({
		scrollPos: 0,
	});

	useEffect(() => {
		// if (pid === '/home/home_8') {
		// 	const html = document.querySelector('html');
		// 	html.classList.remove('light');
		// 	html.classList.add('dark');
		// }
	}, []);

	return (
		<>
			<Meta title="Home 1 || Xhibiter | NFT Marketplace Next.js Template" />

			<WagmiConfig client={client}>
				<Provider store={store}>
					<ThemeProvider enableSystem={true} attribute="class">
						{/* <MetaMaskProvider> */}
							<UserContext.Provider value={{ scrollRef: scrollRef }} suppressHydrationWarning="true">
								{pid === '/login' ? (
									<Component {...pageProps} />
								) : (
									<Layout>
										<Component {...pageProps} />
									</Layout>
								)}
							</UserContext.Provider>
						{/* </MetaMaskProvider> */}
					</ThemeProvider>
				</Provider>
			</WagmiConfig>

			{/* <Provider store={store}>
				<ThemeProvider enableSystem={true} attribute="class">
					<MetaMaskProvider>
						<UserContext.Provider value={{ scrollRef: scrollRef }}>
							{pid === '/login' ? (
								<Component {...pageProps} />
							) : (
								<Layout>
									<Component {...pageProps} />
								</Layout>
							)}
						</UserContext.Provider>
					</MetaMaskProvider>
				</ThemeProvider>
			</Provider> */}
		</>
	);
}

export default MyApp;
