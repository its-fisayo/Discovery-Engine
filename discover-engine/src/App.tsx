import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Table from "./components/table/table";
import type { Column } from "./components/table/table";
import MainLayout from "./layout/Mainlayout";
import DiscoveryPage from "./Pages/DESp/desp";
import Dash from "./Pages/DESPS/Dash";

function App() {
  return (
    <>
    <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dash />} />
          <Route path="/desp" element={<DiscoveryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
