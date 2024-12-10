import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROFILE_MUTATION } from "../graphql/mutations";
import { GET_CURRENT_USER } from "../graphql/queries";

const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  const [input, setInput] = useState({
    name: "",
    bio: "",
    profilePicture: "",
    phone: "",
    address: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      facebook: "",
      instagram: "",
    },
  });

  useEffect(() => {
    if (data && data.me) {
      setInput({
        name: data.me.name || "",
        bio: data.me.bio || "",
        profilePicture: data.me.profilePicture || "",
        phone: data.me.phone || "",
        address: data.me.address || "",
        socialLinks: {
          twitter: data.me.socialLinks.twitter || "",
          linkedin: data.me.socialLinks.linkedin || "",
          facebook: data.me.socialLinks.facebook || "",
          instagram: data.me.socialLinks.instagram || "",
        },
      });
    }
  }, [data]);

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ variables: { input } });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setInput({
      ...input,
      socialLinks: {
        ...input.socialLinks,
        [platform]: value,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6 text-2xl font-bold text-center">User Profile</div>
      <div className="flex flex-col items-center space-y-4">
        <div className="h-24 w-24 rounded-full overflow-hidden mb-6">
          <img
            src={"https://i.pravatar.cc/10" || input.profilePicture}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                value={input.phone}
                onChange={(e) => setInput({ ...input, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Bio
              </label>
              <input
                id="bio"
                name="bio"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                value={input.bio}
                onChange={(e) => setInput({ ...input, bio: e.target.value })}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                value={input.address}
                onChange={(e) =>
                  setInput({ ...input, address: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(input.socialLinks).map((platform) => (
              <div key={platform}>
                <label
                  htmlFor={platform}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </label>
                <input
                  id={platform}
                  name={platform}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                  value={input.socialLinks[platform]}
                  onChange={(e) =>
                    handleSocialLinkChange(platform, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Profile Picture URL
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
              value={input.profilePicture}
              onChange={(e) =>
                setInput({ ...input, profilePicture: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
