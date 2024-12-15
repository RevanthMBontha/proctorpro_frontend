import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import IsAuthRoute from "./components/auth/IsAuthRoute";
import CreateTest from "./pages/CreateTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<IsAuthRoute />}>
          <Route path="test-admin" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="create" element={<CreateTest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
