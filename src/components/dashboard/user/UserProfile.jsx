import { useMutation, useQuery } from "@tanstack/react-query";
import { Camera, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../hook/UseAuth";
import axiosInstance from "../../../utils/api/axios";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      bio: "",
      address: "",
      photo: null,
    },
  });

  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(photoFile[0]);
    }
  }, [photoFile]);

  const { data: profileData } = useQuery({
    queryKey: ["userProfile", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null;
      const res = await axiosInstance.get(`/api/users/${user.uid}/profile`);
      return res.data;
    },
    enabled: !!user?.uid,
  });

  useEffect(() => {
    if (profileData) {
      setValue("name", profileData.name || "");
      setValue("bio", profileData.bio || "");
      setValue("address", profileData.address || "");
      if (profileData.photo) setPhotoPreview(profileData.photo);
    }
  }, [profileData, setValue]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("address", data.address);
      if (data.photo && data.photo.length > 0) {
        formData.append("photo", data.photo[0]);
      }
      const res = await axiosInstance.put(
        `/api/users/${user?.uid}/profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Update Profile?",
      text: "Are you sure you want to update your profile?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutation.mutate(data);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
            My Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={photoPreview || "https://via.placeholder.com/120"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <Camera size={20} className="text-white" />
                  <input
                    {...register("photo")}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white disabled:opacity-50"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                disabled
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white opacity-50"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Bio
              </label>
              <textarea
                {...register("bio")}
                disabled={!isEditing}
                rows="3"
                placeholder="Tell us about yourself"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white disabled:opacity-50"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Address
              </label>
              <input
                {...register("address")}
                disabled={!isEditing}
                placeholder="Your address"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{profileData?.participated || 0}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Participated
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{profileData?.won || 0}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Won</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {profileData?.participated ? Math.round((profileData.won / profileData.participated) * 100) : 0}%
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Win Rate
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">${profileData?.totalPrize || 0}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Prize Won
              </p>
            </div>
          </div>

          {/* Win Percentage Chart */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">Win Percentage Chart</h3>
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Wins</span>
                <span className="text-sm font-medium text-green-600">{profileData?.won || 0}</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-4 mb-2">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${profileData?.participated ? (profileData.won / profileData.participated) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Participations</span>
                <span className="text-sm font-medium text-blue-600">{profileData?.participated || 0}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateMutation.isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Save size={18} />
                {updateMutation.isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
