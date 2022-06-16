import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig.js";
import Login from "../components/Login.js";
import { CgSpinner } from "react-icons/cg";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CgSpinner className="h-10 w-20 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
