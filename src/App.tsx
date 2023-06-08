import React from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Calls } from "./pages/Calls";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Sidebar />
        <Calls />
      </div>
    </QueryClientProvider>
  );
}

export default App;
