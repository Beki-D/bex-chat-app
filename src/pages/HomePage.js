import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Users, Zap, Shield } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white overflow-hidden relative">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 left-1/3"></div>
          <div className="w-96 h-96 bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 left-2/3"></div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-16 relative z-10">
        <div className="text-center p-16">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="h-16 w-16 text-blue-400 animate-pulse mr-4" />
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Bex Chat
              </span>
            </h1>
          </div>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Experience the future of communication with our modern real-time
            chat application. Connect, collaborate, and chat like never before.
          </p>
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-700 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </main>

      <section className="relative z-10 py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-yellow-500" />}
            title="Lightning Fast"
            description="Experience real-time messaging with zero lag."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-green-500" />}
            title="Secure & Private"
            description="Your conversations are protected with end-to-end encryption."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-500" />}
            title="Team Collaboration"
            description="Create group chats and collaborate seamlessly with your team."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-400">
        <p>&copy; 2023 Bex Chat. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 backdrop-filter backdrop-blur-lg">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="flex items-center justify-center text-xl font-semibold mb-2 text-gray-200">
      {title}
    </h3>
  </div>
);

export default LandingPage;
