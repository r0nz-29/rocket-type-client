import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/jetbrains-mono";
import "@fontsource-variable/inter";
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ChakraProvider>
);
