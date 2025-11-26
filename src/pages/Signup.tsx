import { Navbar } from "@/components/Navbar";
import { SignupForm } from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
