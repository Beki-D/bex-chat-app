import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery, useMutation, ApolloProvider } from "@apollo/client";
import { GET_CURRENT_USER, GET_MESSAGES } from "../graphql/queries";
import { CREATE_MESSAGE } from "../graphql/mutations";
import { clientAuth, clientHasura } from "../graphql/client.js";

const getInitials = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase();
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createAvatarFromInitials = (initials) => {
  const canvas = document.createElement("canvas");
  canvas.width = 40;
  canvas.height = 40;
  const context = canvas.getContext("2d");

  const backgroundColor = getRandomColor();
  const textColor = getRandomColor();

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = textColor;
  context.font = "bold 20px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(initials, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
};

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    client: clientAuth,
  });

  const {
    data: messagesData,
    loading: messagesLoading,
    error: messagesError,
  } = useQuery(GET_MESSAGES, {
    client: clientHasura,
  });

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    client: clientHasura,
    update: (cache, { data: { insert_messages_one } }) => {
      const existingMessages = cache.readQuery({ query: GET_MESSAGES });
      const newMessageFromServer = insert_messages_one;
      cache.writeQuery({
        query: GET_MESSAGES,
        data: {
          messages: [...existingMessages.messages, newMessageFromServer],
        },
      });
    },
  });

  const [userName, setUserName] = useState("Guest");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    if (data?.me) {
      setUserName(data.me.name);

      const initials = getInitials(data.me.name);
      const avatarURL = createAvatarFromInitials(initials) || data.me.avatar;

      setUserAvatar(avatarURL || "https://i.pravatar.cc/40?img=5");
    }
  }, [data]);

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData]);

  if (loading || messagesLoading) {
    return <div>Loading...</div>;
  }
  if (error || messagesError) {
    return <div>Error: {error?.message || messagesError?.message}</div>;
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: uuidv4(),
        user_name: userName,
        message: newMessage,
        timestamp: new Date().toISOString(),
        avatar: userAvatar,
      };

      // Optimistically update the UI
      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage("");

      // Send the message to Hasura
      try {
        await createMessage({
          variables: {
            userName: userName,
            message: newMessage,
            timestamp: newMessageObj.timestamp,
            avatar: userAvatar,
          },
        });
      } catch (err) {
        console.error("Error sending message to Hasura:", err);
        alert("Failed to send the message. Please try again.");
      }
    }
  };

  return (
    <ApolloProvider client={clientHasura}>
      <div className="flex h-full flex-col pb-16 bg-gray-900 text-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start ${
                message.user_name === userName ? "justify-end" : ""
              }`}
            >
              {message.user_name !== userName && (
                <div className="mr-2">
                  <img
                    src={message.avatar}
                    alt={message.user_name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <div
                className={`min-w-[15%] max-w-[70%] ${
                  message.user_name === userName
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                } rounded-lg p-3 shadow-md`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold">{message.user_name}</span>
                  <span className="text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-1">{message.message}</p>
              </div>
              {message.user_name === userName && (
                <div className="ml-2">
                  <img
                    src={message.avatar}
                    alt={message.user_name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 right-8 left-8 md:left-72 mb-2 p-4 bg-gray-100 bg-opacity-0 dark:bg-gray-800 flex items-center space-x-2 rounded-lg">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-700 p-2 rounded"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-400 dark:bg-slate-500 dark:hover:bg-slate-400 text-white p-2 rounded w-14"
          >
            Send
          </button>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default Chat;
