import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";
import { DELETE_USER_MUTATION } from "../graphql/mutations";

const AdminPanel = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDeleteUser = (userId) => {
    deleteUser({ variables: { id: userId } });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6 text-2xl font-bold text-center">Admin Panel</div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {data.users.map((user) => (
          <div
            key={user.id}
            className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4"
          >
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {user.email}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              Role:
              <span
                className={`font-medium ${
                  user.role === "admin"
                    ? "bg-green-100 dark:bg-green-800 text-green-100 dark:text-green-100 px-2 py-1 mx-1 rounded"
                    : "p-1"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              Created At:{" "}
              <span className="font-medium">
                {new Date(parseInt(user.createdAt)).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
            <div className="mt-4 w-full flex justify-between items-center">
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="w-full bg-red-500 hover:bg-red-400 text-white p-2 rounded mt-2"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
