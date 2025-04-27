// app/_layout.jsx
import { useState, useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/authServices";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
      const isAuthRoute = segments.length === 1 && ["login", "register"].includes(segments[0]);
      if (!user && !isAuthRoute) {
        router.replace("/login");
      } else if (user && isAuthRoute) {
        router.replace("/");
      }
    }
  }, [loading, user, segments]);

  return <Slot />;
}
