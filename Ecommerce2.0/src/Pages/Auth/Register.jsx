import { CommonForm } from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.js";

const initialState = {
  username: "",
  email: "",
  password: "",
};
const Authregister = () => {
  const [formdata, setFormdata] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formdata)).then((data) => {
      // navigate("/auth/login");
      if (data?.payload?.success) {
        toast({
          title: "Success",
          description: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          description: data?.payload?.message,
          variant: "destructive",
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
          Already have an account ?
          <Link
            to="/auth/login"
            className="text-primary ml-2 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControl={registerFormControls}
        formData={formdata}
        setFormData={setFormdata}
        buttonText={"Create Account"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Authregister;
