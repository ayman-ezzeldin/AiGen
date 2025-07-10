import { useDispatch, useSelector } from "react-redux";
import Label from "../components/Label";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import defaultProfile from "../../profile/assets/me.jpeg";
import ProfileImageUploader from "../components/ProfileImageUploader";
import { updateUser, updateProfileImage } from "../../store/profile/settingsSlice";
import { User } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.settings.user);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateUser({ [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (file) => {
    const url = file ? URL.createObjectURL(file) : defaultProfile;
    dispatch(updateProfileImage({ file, url }));
  };

  const handleImageDelete = () => {
    dispatch(updateProfileImage({ file: null, url: defaultProfile }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* profile picture */}
        <div className="grid gap-3 md:grid-cols-3">
          <p className="md:mb-20 col-span-1 font-medium">Profile picture</p>
          <ProfileImageUploader
            imageUrl={user.profileImage}
            onImageChange={handleImageChange}
            onImageDelete={handleImageDelete}
          />
        </div>

        {/* Name */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="name" label="Name:" />
          <div className="flex gap-2 md:gap-8 flex-1 col-span-2">
            <Input id="name" value={user.name} onChange={handleChange} />
            <Input
              id="lastName"
              value={user.lastName}
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
            icon={User}
          />
        </div>

        {/* Job Title */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="jobTitle" label="Job Title:" />
          <Input id="jobTitle" value={user.jobTitle} onChange={handleChange} />
        </div>

        {/* Country */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="country" label="Country:" />
          <Input
            id="country"
            value={user.country}
            onChange={handleChange}
            icon={User}
          />
        </div>

        {/* Bio */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="bio" label="Bio:" />
          <textarea
            id="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full mt-2 p-4 border resize-none border-gray-200 rounded h-24 outline-none bg-white col-span-2"
            placeholder="Write about yourself"
          ></textarea>
        </div>

        {/* Submit */}
        <SubmitButton>Save changes</SubmitButton>
      </form>
    </div>
  );
};

export default Profile;
