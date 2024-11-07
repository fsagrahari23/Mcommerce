import { CommonForm } from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast.js";

const initialState = {
  email: "",
  password: "",
};
const AuthLogin = () => {
  const [formdata, setFormdata] = useState(initialState);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser(formdata)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Logged in successfully",
          description: data?.payload?.message,
        });
        navigate("/shop/home");
      } else {
        toast({
          title: "User not found",
          varient: "destructive",
        });
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl tracking-tighter text-foreground font-bold">
          Create New Account
        </h1>
        <p className="mt-2">
          Dont have an account ?
          <Link
            to="/auth/register"
            className="text-primary ml-2 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <CommonForm
        formControl={loginFormControls}
        formData={formdata}
        setFormData={setFormdata}
        buttonText={"Login"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
