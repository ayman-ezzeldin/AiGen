import { useState } from "react";
import defaultProfile from "../assets/me.jpeg";

const ProfileImageUploader = ({ imageUrl, onImageChange, onImageDelete }) => {
  const [preview, setPreview] = useState(imageUrl || defaultProfile);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      onImageChange(file);
    }
  };

  const handleDelete = () => {
    setPreview(defaultProfile);
    onImageDelete();
  };

  return (
    <div className="flex items-center gap-6 md:mb-10 col-span-2">
      <img
        src={preview}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover"
      />
      <div className="flex items-center gap-4">
        <label
          htmlFor="upload"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-sm hover:bg-blue-600"
        >
          Update picture
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleDelete}
          type="button"
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
