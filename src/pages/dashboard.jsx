import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import {
  Mic,
  Send,
  Volume2,
  Menu,
  PlusCircle,
  MessageCircle,
  Clock,
  Settings,
} from "lucide-react";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import { sendChatMessage } from "../components/api"; // Import the sendChatMessage function

const suggestedPrompts = [
  "How can I manage stress?",
  "Tips for better sleep",
  "Dealing with anxiety",
  "Improving self-esteem",
];

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = useState(false);
  const [userData, setUserData] = useState(null);
  const messagesEndRef = useRef(null);
  const userId = localStorage.getItem("userId");

  // Scroll to the bottom of the messages list whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch user data from Firebase when the component mounts
  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUserData = async (userId) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No data available for this user.");
      }
    } catch (error) {
      console.error("Error fetching user data:");
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message to the chat
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setHasSubmittedPrompt(true);

      try {
        // Send user input to FastAPI and get the response as JSON
        const aiResponseJson = await sendChatMessage(userId, input);

        // Check for the response text in the JSON object
        if (aiResponseJson && aiResponseJson.response) {
          // Add the AI's response to the chat
          setMessages((msgs) => [
            ...msgs,
            { text: aiResponseJson.response, sender: "ai" },
          ]);
        } else {
          setMessages((msgs) => [
            ...msgs,
            { text: "Error fetching response.", sender: "ai" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching AI response:");
        // Add error message to chat in case of failure
        setMessages((msgs) => [
          ...msgs,
          { text: "Error fetching response.", sender: "ai" },
        ]);
      }
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice input logic here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-16 bg-white border-r border-gray-200">
        <div className="flex flex-col items-center py-4">
          <Button variant="ghost" className="mb-4">
            <Menu className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="mb-4">
            <PlusCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="mb-4">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="mb-4">
            <Clock className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="mt-auto">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        {!hasSubmittedPrompt && (
          <header className="bg-white shadow-sm z-10 p-4">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Hello, {userData ? userData.name : "User"}
            </h1>
            <p className="text-gray-500 text-lg">How can I help you today?</p>
          </header>
        )}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {!hasSubmittedPrompt && messages.length === 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {suggestedPrompts.map((prompt, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      setInput(prompt);
                      handleSend();
                    }}
                  >
                    <p className="text-sm text-gray-700">{prompt}</p>
                  </Card>
                ))}
              </div>
            )}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-sm ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.sender === "ai" ? (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto flex items-center space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Send className="h-5 w-5" />
            </Button>
            <Button onClick={handleVoiceInput} variant="outline">
              <Mic className={`h-5 w-5 ${isListening ? "text-red-500" : ""}`} />
            </Button>
            <Button variant="outline">
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
