import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import IsAuthRoute from "./components/auth/IsAuthRoute";
import IsNotAuthRoute from "./components/auth/IsNotAuthRoute";
import Test from "./pages/Test";
import Account from "./pages/Account";
import Authenticate from "./pages/Authenticate";
import CreateTest from "./pages/CreateTest";

import "react-quill/dist/quill.snow.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="test-admin" element={<AppLayout />}>
            {/* Route for Home */}
            <Route element={<IsAuthRoute />}>
              <Route index element={<Home />} />
            </Route>

            {/* Route for creating test */}
            <Route path="create" element={<IsAuthRoute />}>
              <Route index element={<CreateTest />} />
            </Route>

            {/* Route for a new route */}
            <Route path="create/new" element={<IsAuthRoute />}>
              <Route index element={<Test />} />
            </Route>

            {/* Route for editing a test */}
            <Route path="create/:testId" element={<IsAuthRoute />}>
              <Route index element={<Test />} />
            </Route>

            {/* Route for accessing the account */}
            <Route path="account" element={<IsAuthRoute />}>
              <Route index element={<Account />} />
            </Route>
          </Route>
          {/* Route for login */}
          <Route path="authenticate" element={<IsNotAuthRoute />}>
            <Route index element={<Authenticate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
