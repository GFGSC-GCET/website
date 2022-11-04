import '../styles/globals.css'
import { ThemeProvider, useTheme } from "next-themes";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

import AuthStateChanged from '../src/firebase/authState';
import { UserContextProvider } from "../src/firebase/authContext";

const progress = new ProgressBar({
  size: 5,
  color: "#4ade80",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);


function MyApp({ Component, pageProps }) {
  return (
    
    <UserContextProvider>
      <AuthStateChanged>
        <ThemeProvider enableSystem="false" attribute="class">
          <div className="dark:bg-gray-900 min-h-screen min-w-screen">
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </AuthStateChanged>
    </UserContextProvider>
  )
}

export default MyApp
