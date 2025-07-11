import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteAccount } from "../../store/profile/settingsSlice";

const DeleteAccountButton = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const removeAccount = async () => {
    try {
      await dispath(deleteAccount()).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700">
          Delete account
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-full max-w-[350px] space-y-4 rounded-xl bg-white p-4 text-gray-800 shadow-lg sm:px-6 md:max-w-md md:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-red-600">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-end gap-4 pt-4">
          <AlertDialogCancel className="cursor-pointer rounded-md border px-4 py-2 text-gray-700 transition hover:bg-gray-100">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={removeAccount}
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountButton;