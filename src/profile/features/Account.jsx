import Label from "../components/Label";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  resetPasswordInputs,
  updateAccountPassword,
} from "../../store/profile/settingsSlice";
import { toast } from "sonner";

import DeleteAccountButton from "../components/DeleteAccountButton";

const Account = () => {
  const passwordData = useSelector((state) => state.settings.account);
  const status = useSelector((state) => state.settings.status);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateAccountPassword({ key: id, value }));
  };

  const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { new_password, confirm_password } = passwordData;

    if (new_password !== confirm_password) {
      toast.error("The passwords you entered do not match");
      return;
    }

    if (!isStrongPassword(new_password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      );
      return;
    }

    try {
      await dispatch(changePassword(passwordData)).unwrap();
      toast.success("Password changed successfully!");
      dispatch(resetPasswordInputs());
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="animate-in fade-in duration-800">
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex flex-col gap-6">
          {/* Old password */}
          <div className="grid gap-3 md:grid-cols-3">
            <Label id="old_password" label="Enter Old Password:" />
            <PasswordInput
              id="old_password"
              value={passwordData.old_password}
              onChange={handleChange}
            />
          </div>
          {/* Enter new password */}
          <div className="grid gap-3 md:grid-cols-3">
            <Label id="new_password" label="Enter New Password:" />
            <PasswordInput
              id="new_password"
              value={passwordData.new_password}
              onChange={handleChange}
            />
          </div>
          {/* Confirm new password */}
          <div className="grid gap-3 md:grid-cols-3">
            <Label id="confirm_password" label="Confirm Password:" />
            <PasswordInput
              id="confirm_password"
              value={passwordData.confirm_password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <SubmitButton isLoading={status.changePassword === "loading"}>
          Confirm
        </SubmitButton>
      </form>

      {/* Remove account */}

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="col-span-3 flex flex-col max-md:text-center md:col-span-1">
          <h3 className="text-lg">Remove account</h3>
          <p className="text-sm md:w-52">
            You can do "Disable account- to take a break from Model Craft.
          </p>
        </div>
        <div className="col-span-3 flex items-center gap-x-7 max-md:justify-center md:col-span-2">
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
};

export default Account;