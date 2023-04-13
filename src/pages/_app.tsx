import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <main className="flex min-h-screen flex-col items-center">
    <Navbar />
    <div className="mt-24">
      <Component {...pageProps} />
    </div>
  </main>
)}

export default api.withTRPC(MyApp);
