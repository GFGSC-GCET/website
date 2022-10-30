import '../styles/globals.css'
import { ThemeProvider } from "next-themes";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 5,
  color: "#166534",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);


function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider enableSystem="false" attribute="class">
    <div className="dark:bg-gray-900">
      <Component {...pageProps} />
    </div>
  </ThemeProvider>
  )
}

export default MyApp
