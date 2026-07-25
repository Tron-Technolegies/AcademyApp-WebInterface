import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./UserContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer position="bottom-right" theme="dark" />
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  </StrictMode>,
);
