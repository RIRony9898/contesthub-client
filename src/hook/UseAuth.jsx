import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reload, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  googleProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "../firebase/firebase.config.js";
import axiosInstance, { setUserInterceptor } from "../utils/api/axios.jsx";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("user");
  const queryClient = useQueryClient();

  //  Format user from Firebase Auth
  const formatUser = (firebaseUser) => {
    if (!firebaseUser) {
      setUserInterceptor(null);
      return null;
    }

    const { displayName, email, uid, photoURL } = firebaseUser;
    return { displayName, email, uid, photoURL };
  };

  //  Sync to backend only once per login (React Query handles caching)
  useQuery({
    queryKey: ["user-sync", user?.uid],
    enabled: !!user?.displayName, // Only run when UID exists
    queryFn: async () => {
      const userData = {
        username: user.displayName,
        uid: user.uid,
        email: user.email,
        role: selectedRole,
      };

      setUserInterceptor(userData);
      const res = await axiosInstance.post("/api/auth/login", userData);
      console.log("✅ Synced to backend:", res.data.role);
      return res.data;
    },
    staleTime: Infinity,
    retry: false,
    onSuccess: (data) => {
      if (data?.token) {
        setUserInterceptor(data.token);
      }
      setUser((prev) => ({ ...prev, role: data.role }));
    },
    onError: (error) => {
      console.error("Backend sync failed:", error);
      setUser((prev) => ({ ...prev, role: "user" }));
    },
  });

  // 🔹 Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const formatted = formatUser(firebaseUser);
      if (!formatted) {
        setUser(null);
      } else {
        setUser({ ...formatted, role: "user" }); // default role
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Login with Google
  const loginWithGoogle = async (role) => {
    try {
      setSelectedRole(role);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed:", error.message);
      throw error;
    }
  };

  // 🔹 Login with Email/Password
  const loginWithEmail = async (email, password, role) => {
    try {
      setSelectedRole(role);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email login failed:", error.message);
      throw error;
    }
  };

  // 🔹 Register with Email
  const registerWithEmail = async (
    email,
    password,
    displayName,
    photoURL,
    role
  ) => {
    try {
      setSelectedRole(role);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName, photoURL });
      await reload(result.user);
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  };

  // 🔹 Logout and clear only specific user query
  const logout = async () => {
    try {
      await signOut(auth);
      await axiosInstance.post("/api/auth/logout");
      queryClient.removeQueries({ queryKey: ["user-sync", user?.uid] }); // ✅ Just one
    } catch (error) {
      console.error("Logout failed:", error.message);
      throw error;
    }
  };

  return {
    user,
    loading,
    selectedRole,
    setSelectedRole,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
};

export default useAuth;
