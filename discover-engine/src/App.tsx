import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Table from "./components/table/table";
import type { Column } from "./components/table/table";
import MainLayout from "./layout/Mainlayout";
import DiscoveryPage from "./pages/discovery/DicoveryPage";

function App() {
  return (
    <>
    <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DiscoveryPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
