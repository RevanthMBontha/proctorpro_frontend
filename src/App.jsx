import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import IsAuthRoute from "./components/auth/IsAuthRoute";
import CreateTest from "./pages/CreateTest";
import Account from "./pages/Account";
import "react-quill/dist/quill.snow.css";

// To attempt the Test create a link and add it here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsAuthRoute />}>
          <Route path="test-admin" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="create" element={<CreateTest />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
