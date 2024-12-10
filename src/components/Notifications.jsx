import React from "react";
import {
  Bell as BellIcon,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const Notifications = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6 text-2xl font-bold text-center">Notifications</div>
      <div className="space-y-6">
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex items-center space-x-4">
          <BellIcon className="text-blue-500" />
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              New Message from Alex
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              You have a new message from Alex regarding your recent activity.
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded">
            View Message
          </button>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex items-center space-x-4">
          <MessageSquare className="text-green-500" />
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              New Comment on Your Post
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              Someone commented on your recent post. Check it out now.
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-400 text-white p-2 rounded">
            View Post
          </button>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex items-center space-x-4">
          <AlertCircle className="text-yellow-500" />
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              System Alert: Maintenance Scheduled
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              The system will undergo maintenance tomorrow from 3:00 AM to 5:00
              AM.
            </div>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded">
            Acknowledge
          </button>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex items-center space-x-4">
          <CheckCircle className="text-green-500" />
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Task Completed Successfully
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              The task you assigned has been completed successfully. Check it
              now.
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-400 text-white p-2 rounded">
            View Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
