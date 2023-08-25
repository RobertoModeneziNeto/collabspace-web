import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";

import { AuthenticationProvider } from "./contexts/AuthContext";

import "./styles/main.css";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
