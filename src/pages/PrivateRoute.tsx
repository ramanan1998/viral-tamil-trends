import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute() {

  const { token } = useAuth();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    // wait for zustand-persist to finish loading storage
    const unsub = useAuth.persist.onFinishHydration(() => {
      setRehydrated(true);
    });

    // in case hydration already finished
    if (useAuth.persist.hasHydrated()) {
      setRehydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  // if (!rehydrated) {
  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

//   if (!rehydrated) {
//     return <FullScreenLoader/>
//   }

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return <Navigate to="/" />;
}
