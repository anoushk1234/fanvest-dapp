import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/dist/shared/lib/router/router"
import theme from "../utils/theme"
import Layout from '../components/Layout'
import Wallet from '../utils/walletContext'
import "@fontsource/lexend/latin.css";
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
    <Wallet>
        <Layout>
            <ToastContainer />
            <Component {...pageProps} />
        </Layout>
    </Wallet>
</ChakraProvider>
  )
}

export default MyApp