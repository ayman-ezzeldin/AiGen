import { useDispatch, useSelector } from "react-redux";
import Label from "../components/Label";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import ProfileImageUploader from "../components/ProfileImageUploader";
import defaultProfile from "../assets/me.jpeg";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  updateUser,
  updateProfileImage,
  getProfileData,
  editProfileData,
  deleteImage,
  resetEditStatus,
} from "../../store/profile/settingsSlice";
import { Mails } from "lucide-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.settings);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const profileFields = ["fullName", "bio", "image"];
    if (profileFields.includes(id)) {
      dispatch(updateUser({ profile: { [id]: value } }));
    } else {
      dispatch(updateUser({ [id]: value }));
    }
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    const url = file ? URL.createObjectURL(file) : user.profile.image;
    dispatch(updateProfileImage({ url }));
  };

  const handleImageDelete = () => {
    setImageFile(null);
    dispatch(updateProfileImage({ url: defaultProfile }));

    const formData = new FormData();
    formData.append("profile.image", "");

    dispatch(deleteImage(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("profile.full_name", user.profile.full_name);
    formData.append("profile.bio", user.profile.bio);

    if (imageFile) {
      formData.append("profile.image", imageFile);
    }

    dispatch(editProfileData(formData));
  };

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (status.getProfile === "failed") {
      toast.error(error.getProfile);
    }
  }, [status.getProfile, error.getProfile]);

  useEffect(() => {
    if (status.editProfile === "succeeded") {
      toast.success("The data has been updated successfully");
      dispatch(resetEditStatus());
    } else if (status.editProfile === "failed") {
      toast.error(error.editProfile);
      dispatch(resetEditStatus());
    }
  }, [status.editProfile, error.editProfile]);

  if (status.getProfile === "loading") {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 md:h-12 md:w-12" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* profile picture */}
        <div className="grid gap-3 md:grid-cols-3">
          <p className="col-span-1 font-medium md:mb-20">Profile picture</p>
          <ProfileImageUploader
            imageUrl={user.profile.image}
            onImageChange={handleImageChange}
            onImageDelete={handleImageDelete}
          />
        </div>

        {/* Name */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="name" label="Name:" />
          <div className="col-span-2 flex flex-1 gap-2 md:gap-8">
            <Input
              id="first_name"
              value={user.first_name}
              onChange={handleChange}
            />
            <Input
              id="last_name"
              value={user.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Username */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="username" label="Username:" />
          <Input id="username" value={user.username} onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="email" label="Email Address:" />
          <Input
            id="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            icon={Mails}
          />
        </div>

        {/* Bio */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="bio" label="Bio:" />
          <textarea
            id="bio"
            value={user.profile.bio}
            onChange={handleChange}
            className="col-span-2 mt-2 h-24 w-full resize-none rounded border border-gray-200 bg-white p-4 text-[#12121261] outline-none"
            placeholder="Write about yourself"
          ></textarea>
        </div>

        {/* Submit */}
        <SubmitButton isLoading={status.editProfile === "loading"}>
          Save changes
        </SubmitButton>
      </form>
    </div>
  );
};

export default Profile;