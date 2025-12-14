import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"   
      enableSystem={false}  
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
