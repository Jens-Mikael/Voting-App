"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/firebase/context/AuthContext";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "@/redux/store";

const Providers = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
      </AuthProvider>
    );

  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
