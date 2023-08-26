import { useAuthentication } from "../contexts/AuthContext";
import AuthRoutes from "./auth";
import DeauthRoutes from "./deauth";

function AppRoutes() {
  const { signed } = useAuthentication();
  return signed ? <AuthRoutes /> : <DeauthRoutes />;
}

export default AppRoutes;
