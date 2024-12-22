import { useNavigate } from "react-router-dom";
import useField from "../../../hooks/useField";
import usePasswordField from "../../../hooks/usePasswordField";
import post from "../../../services/Admin/post";
import catchErrors from "../../../utils/catchErrors";
import PasswordField from "../../Form/PasswordField";
import TextField from "../../Form/TextField";
import notify from "./../../../utils/notify";
import validateData from "./../../../utils/validateData";

const Login = () => {
  const router = useNavigate();
  const { reset: resetEmailField, ...usernameField } = useField({
    type: "email",
    name: "email",
    isRequired: true,
    label: "Email Address",
    min: 5,
    max: 60,
  });

  const { reset: resetPasswordField, ...password } = usePasswordField({
    name: "password",
    isRequired: true,
    label: "Password",
    min: 5,
    max: 60,
  });

  const data = {
    email: usernameField.value,
    password: password.value,
  };

  const reset = () => {
    resetEmailField();
    resetPasswordField();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDataValid = validateData(data);

    if (isDataValid) {
      try {
        const res = await post.loginAdmin(data);
        notify.success(res.message);
        localStorage.setItem("authToken", res.token);
        setTimeout(() => {
          router("/admin");
        }, 2000);
      } catch (err) {
        const message = catchErrors(err);
        notify.error(message);
      } finally {
        reset();
      }
    } else {
      notify.warning("please, fill all fields.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-3/5 lg:w-2/5 flex flex-col p-5 bg-white  drop-shadow-lg"
      >
        <div className="text-center text-xl font-light mb-5">
          Sign in to your Account
        </div>
        <TextField {...usernameField} placeholder="admin@leosteph.com" />
        <PasswordField {...password} placeholder="******" />

        <div className=" w-full flex flex-col items-center">
          <button
            type="submit"
            className="w-full md:w-3/4 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 rounded-md"
          >
            Enter Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
