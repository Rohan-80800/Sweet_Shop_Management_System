import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Index from "./pages/Index";
import { getCurrentUser } from "./api";
import { setUser, clearUser, setAuthLoading } from "./slices/authSlice";
import { Toaster } from "sonner";
import LoadingScreen from "./components/Loadingscreen";

const App = () => {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hydrateAuth = async () => {
      dispatch(setAuthLoading(true));
      try {
        const res = await getCurrentUser();
        dispatch(setUser(res.data));
      } catch {
        dispatch(clearUser());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    hydrateAuth();
  }, [dispatch]);

  if (appLoading || authLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Toaster
        position="bottom-right"
        duration={2000}
        richColors
        offset={30}
        closeButton
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
