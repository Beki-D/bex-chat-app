import React from "react";
import { Settings as SettingsIcon, Lock, Bell, Wifi } from "lucide-react";

const Settings = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6 text-2xl font-bold text-center">Settings</div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            <SettingsIcon className="inline mr-2" /> Account Settings
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Update your account information like email, password, and more.
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">
            Edit Account Info
          </button>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            <Lock className="inline mr-2" /> Privacy Settings
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Control who can view your profile and your activity.
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">
            Edit Privacy Settings
          </button>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            <Wifi className="inline mr-2" /> Connectivity Settings
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Manage your network and device connections.
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">
            Edit Connectivity Settings
          </button>
        </div>

        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            <Bell className="inline mr-2" /> Notification Preferences
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Choose how and when you'd like to receive notifications.
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">
            Edit Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
