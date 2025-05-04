import { Button } from "@chakra-ui/react";
import "./App.css";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import PrivateRoutes from "./configs/PrivateRoutes";
import ProofImg from "./pages/ProofImg";
import CameraVerify from "./pages/CameraVerify";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/signup"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <PrivateRoutes>
              <Layout />
            </PrivateRoutes>
          }
        >
          <Route path="/img-proof" element={<ProofImg />} />
          <Route path="/camera-verify" element={<CameraVerify />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
