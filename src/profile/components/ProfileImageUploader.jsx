import { useEffect, useState } from "react";
import defaultProfile from "../assets/me.jpeg";

const ProfileImageUploader = ({ imageUrl, onImageChange, onImageDelete }) => {
  const [preview, setPreview] = useState(defaultProfile);

  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

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
    <div className="col-span-2 flex items-center gap-6 md:mb-10">
      <img
        src={preview || null}
        alt="Profile"
        className="h-20 w-20 rounded-full object-cover"
        onError={(e) => {
          e.target.src = defaultProfile;
          e.target.onError = null;
        }}
      />
      <div className="flex items-center gap-4">
        <label
          htmlFor="upload"
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
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
          className="cursor-pointer text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;