import Layout from "../components/layout/Layout";
import "../styles/globals.css";

// Conponent prop is our Pages, pagePorps is  our components inside pages that gotted by next js as props

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
