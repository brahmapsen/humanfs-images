//import '../styles/globals.css';
import Layout from '../components/Layout';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
//import { alchemyProvider } from 'wagmi/providers/alchemy';
//import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

const { chains, provider } = configureChains(
  [
    //chain.mainnet,
    chain.polygon,
    chain.polygonMumbai,
  ],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    // publicProvider(),
    infuraProvider({ infuraId: process.env.INFURA_ID }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        initialChain={80001}
        showRecentTransactions={true}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
