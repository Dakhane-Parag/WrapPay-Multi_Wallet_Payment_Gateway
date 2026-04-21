import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { setToken, setMerchantData } from "@/lib/api";

declare global {
    interface Window {
        google: any;
    }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

export default function GoogleButton({ isSignup }: { isSignup: boolean }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const initGoogle = () => {
            if (!window.google) return;
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleCredentialResponse,
            });
        };

        // If script is already loaded (e.g. navigating back), init immediately
        if (window.google) {
            initGoogle();
            return;
        }

        const existing = document.querySelector(
            'script[src="https://accounts.google.com/gsi/client"]'
        );

        if (existing) {
            existing.addEventListener("load", initGoogle);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initGoogle;
        document.body.appendChild(script);
    }, []);

    async function handleCredentialResponse(response: any) {
        const idToken = response.credential;
        if (!idToken) {
            setError("Google sign-in failed: no credential received.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE ?? "http://localhost:4000"}/auth/google`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: idToken }),
                }
            );

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error ?? `Request failed (${res.status})`);
            }

            const data = await res.json();

            // ✅ Save auth data to localStorage
            setToken(data.token);
            setMerchantData(data.merchant as Record<string, unknown>);

            // ✅ Navigate — AuthGate will redirect to onboarding/pending/dashboard
            navigate("/dashboard");
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : `Google ${isSignup ? "sign-up" : "sign-in"} failed. Please try again.`
            );
        } finally {
            setLoading(false);
        }
    }

    function handleGoogleLogin() {
        if (!window.google) {
            setError("Google sign-in is not ready yet. Please try again.");
            return;
        }
        window.google.accounts.id.prompt();
    }

    return (
        <div className="w-full">
            {error && (
                <div className="mb-3 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-medium shadow-md hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <svg className="w-5 h-5 animate-spin text-gray-600" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : (
                    <FcGoogle className="text-2xl" />
                )}
                {loading
                    ? isSignup ? "Signing up..." : "Signing in..."
                    : isSignup ? "Sign Up with Google" : "Sign In with Google"
                }
            </motion.button>
        </div>
    );
}
