// import AppRoutes from './routes/AppRoutes';
// import WalletContextProvider from './components/Wallet/WalletContextProvider.js';




import WalletContextProvider from './components/WalletContextProvider'
import AppRoutes from './routes/AppRoutes';
/**
 * Root Application Component
 * @component App
 */
const App = () => {
  return (
        <WalletContextProvider>
              <AppRoutes />
        </WalletContextProvider>
  );
};

export default App;