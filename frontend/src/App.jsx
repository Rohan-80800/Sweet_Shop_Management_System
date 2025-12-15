import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Index from "./pages/Index";
import { getCurrentUser } from "./api";
import { setUser, clearUser, setAuthLoading } from "./slices/authSlice";
import LoadingScreen from "./components/Loadingscreen";
import { Toaster } from "sonner";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const hydrateAuth = async () => {
      dispatch(setAuthLoading(true));
      try {
        const res = await getCurrentUser();
        console.log(res);
        dispatch(setUser(res.data));
      } catch {
        dispatch(clearUser());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    hydrateAuth();
  }, [dispatch]);

  if (loading) {
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
