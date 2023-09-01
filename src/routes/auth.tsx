import { Navigate, Route, Routes } from "react-router-dom";

import Feed from "../pages/Feed";
import Profile from "../pages/Profile";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="feed" />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/me/:id" element={<Profile />} />

      <Route path="*" element={<h1>Not Found!</h1>} />
    </Routes>
  );
}

export default AuthRoutes;
