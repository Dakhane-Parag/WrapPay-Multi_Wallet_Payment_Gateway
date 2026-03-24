import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";

declare global {
    interface Window {
        google: any;
    }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
// const CLIENT_ID = "480050382727-mgiha9l35fcmmtn1ggnb1rf260joc89a.apps.googleusercontent.com";

export default function GoogleButton({ isSignup }: { isSignup: boolean }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleCredentialResponse,
            });
        };
    }, []);

    async function handleCredentialResponse(response: any) {
        const idToken = response.credential;

        const res = await fetch("http://localhost:4000/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
        });

        const data = await res.json();
        console.log("User:", data);
    }

    function handleGoogleLogin() {
        window.google.accounts.id.prompt(); // Opens Google popup
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
        >
            <FcGoogle className="text-2xl" />
            {isSignup ? "Sign Up with Google" : "Sign In with Google"}
        </motion.button>
    );
}
