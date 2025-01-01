import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppState from "./context/MapState.tsx";
import { ToastContainer } from "react-toastify";
import { NuqsAdapter } from "nuqs/adapters/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 10 seconds
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1.5 * 1000,
      networkMode: "always",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <NuqsAdapter>
    <AppState>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <App />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </AppState>
  </NuqsAdapter>
  // </StrictMode>
);
