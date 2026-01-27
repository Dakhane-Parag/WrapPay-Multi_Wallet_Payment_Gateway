import { Link } from "react-router-dom";
import Logo from "../assets/wrap1.png";
import logImage from "../assets/login.jpg"


export default function Signup() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: Signup Form */}
      <div className="flex items-center justify-center bg-black/90 px-6">
        <div className="w-full max-w-md text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={Logo} alt="WrapPayments" className="h-10 w-10 rounded-full" />
            <span className="text-2xl font-bold">WrapPayments</span>
          </div>

          <h1 className="text-3xl font-semibold mb-2">
            Create your WrapPayments account
          </h1>
          <p className="text-white/70 mb-8">
            Get started in minutes. No credit card required.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-2 text-white/80">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] 
              "
            />
          </div>

          {/* Signup button */}
          <button
            className="
              w-full py-3 rounded-xl mt-2
              bg-[#003f3f]
              hover:bg-[#005f5f]
              text-[#e6fffb] font-semibold
              shadow-[0_0_20px_rgba(0,63,63,0.5)]
              transition
            "
          >
            Sign up
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/10" />
            <span className="px-4 text-sm text-white/40">OR</span>
            <div className="flex-grow h-px bg-white/10" />
          </div>

          {/* OAuth */}
<button
  className="
    w-full py-3 mb-3 rounded-xl
    border border-white/15
    text-white font-medium
    hover:bg-white/5
    transition
    flex items-center justify-center gap-3
  "
>
  {/* Google Icon */}
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.78 32.91 29.303 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.227 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691 12.876 19.51C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.227 4 24 4c-7.682 0-14.38 4.337-17.694 10.691Z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.096 0 9.834-1.949 13.379-5.129l-6.173-5.223C29.169 35.091 26.715 36 24 36c-5.281 0-9.741-3.068-11.282-7.5l-6.497 5.003C9.505 39.556 16.227 44 24 44Z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.02 12.02 0 0 1-4.097 5.648l.003-.002 6.173 5.223C36.941 39.18 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
    />
  </svg>

  Continue with Google
</button>

<button
  className="
    w-full py-3 rounded-xl
    border border-white/15
    text-white font-medium
    hover:bg-white/5
    transition
    flex items-center justify-center gap-3
  "
>
  {/* GitHub Icon */}
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.58.23 2.75.11 3.04.74.81 1.19 1.85 1.19 3.11 0 4.42-2.69 5.4-5.25 5.68.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
  </svg>

  Continue with GitHub
</button>


          {/* Footer */}
          <p className="text-sm text-white/50 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[rgb(88,196,186)] hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-xs text-white/40 mt-8 leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
          
        </div>
      </div>

      {/* RIGHT: Image / Visual */}
      <div className="hidden py-10 lg:block relative">
        <img
          src={logImage}
          alt="Global payments"
          className="absolute inset-0 h-full w-full object-cover "
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
