import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./components/Profile";
import Chat from "./components/Chat";
import Settings from "./components/Settings";
import Notifications from "./components/Notifications";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="chat" />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
