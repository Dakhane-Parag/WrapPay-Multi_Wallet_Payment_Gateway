import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-black overflow-hidden px-4">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute w-[500px] h-[500px] bg-purple-500 blur-[200px] rounded-full -z-10 top-20 left-20"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute w-[450px] h-[450px] bg-indigo-500 blur-[200px] rounded-full -z-10 bottom-20 right-20"
      />

      {/* Form Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          w-full max-w-md bg-white/10 border border-white/20 
          backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-white
        "
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Google Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="
            w-full flex items-center justify-center gap-3 
            bg-white text-black py-3 rounded-lg font-medium
            shadow-md hover:bg-gray-100 transition
          "
        >
          <FcGoogle className="text-2xl" />
          {isSignup ? "Sign Up with Google" : "Sign In with Google"}
        </motion.button>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/60 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {isSignup ? (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-4"
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Full Name"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg"
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Email Address"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg"
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                placeholder="Create Password"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="
                  w-full bg-[#7c59e6] hover:bg-[#a995fc] 
                  py-3 rounded-lg font-semibold transition
                "
              >
                Sign Up
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="space-y-4"
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Email Address"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg"
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                placeholder="Password"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="
                  w-full bg-[#7c59e6] hover:bg-[#a995fc] 
                  py-3 rounded-lg font-semibold transition
                "
              >
                Sign In
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Bottom Switch Link */}
        <p className="text-center mt-6 text-white/80">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={toggleForm}
            className="text-purple-300 hover:text-purple-200 cursor-pointer font-medium"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
