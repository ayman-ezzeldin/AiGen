import Label from "../components/Label";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountPassword } from "../../store/profile/settingsSlice";

const Account = () => {
  const passwordData = useSelector((state) => state.settings.account);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateAccountPassword({ ...passwordData, [id]: value }));
  };

  const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex flex-col gap-6">
          {/* new password */}
          <div className="grid gap-3 md:grid-cols-3">
            <Label id="newPassword" label="Change Password:" />
            <PasswordInput
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
            />
          </div>
          {/* confirm password */}
          <div className="grid gap-3 md:grid-cols-3">
            <Label id="confirmPassword" label="Confirm Password:" />
            <PasswordInput
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <SubmitButton handleSubmit={handleSubmit}>Confirm</SubmitButton>
      </form>

      {/* Remove account */}
      <div className="grid gap-10 md:grid-cols-3 mt-10">
        <div className="col-span-1 flex flex-col ">
          <h3 className="text-lg">Remove account</h3>
          <p className="text-sm w-52">
            You can do {""} Disable account- to take a break from Model Craft.
          </p>
        </div>
        <div className="col-span-2 flex items-center gap-x-7">
          <button className="px-5 py-3 font-medium text-white text-sm bg-red-600 hover:bg-red-700 transition rounded-md cursor-pointer">
            Disable account
          </button>
          <button className="text-red-600 font-medium cursor-pointer">
            delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
