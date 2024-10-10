import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import {
  Mic,
  Send,
  Menu,
  PlusCircle,
  MessageCircle,
  Clock,
  Settings,
  Square,
  Play,
  Trash2,
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
  const [isRecording, setIsRecording] = useState(false);
  const [hasSubmittedPrompt, setHasSubmittedPrompt] = useState(false);
  const [userData, setUserData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(new Audio());
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

  // UseEffect to handle exit
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      await sendExitMessage(); // Send exit message to backend
      // Optionally, show a confirmation dialog (not supported in all browsers)
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sendExitMessage(); // Send exit message on component unmount
    };
  }, []);

  const sendExitMessage = async () => {
    try {
      // Send exit message to the backend
      await sendChatMessage(userId, "generate report");
      console.log("Exit message sent to backend.");
    } catch (error) {
      console.error("Error sending exit message:", error);
    }
  };

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
      const currentInput = input; // Store input to avoid closure issues
      // Add user's message to the chat
      setMessages([...messages, { text: currentInput, sender: "user" }]);

      setInput("");
      setHasSubmittedPrompt(true);

      try {
        // Send user input to FastAPI and get the response as JSON
        const aiResponseJson = await sendChatMessage(userId, currentInput);

        // Check for the response text in the JSON object
        if (aiResponseJson && aiResponseJson.response) {
          // Add the AI's response to the chat
          setMessages((msgs) => [
            ...msgs,
            { text: aiResponseJson.response, sender: "ai" },
          ]);
          // If there's audio, create an audio URL and add it to the messages
          // if (aiResponseJson.audio) {
          //   const audioBlob = new Blob(
          //     [
          //       new Uint8Array(
          //         atob(aiResponseJson.audio)
          //           .split("")
          //           .map((c) => c.charCodeAt(0))
          //       ),
          //     ],
          //     { type: "audio/wav" }
          //   );
          //   const audioUrl = URL.createObjectURL(audioBlob);
          //   setMessages((msgs) => [
          //     ...msgs,
          //     {
          //       sender: "ai",
          //       audioUrl: audioUrl,
          //     },
          //   ]);
          // }
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

  const handleSuggestedPrompt = async (prompt) => {
    setInput(prompt); // Set the input to the selected prompt
    await handleSend(); // Immediately send the prompt
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = 1.25;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const deleteAudio = () => {
    setAudioUrl(null);
    audioRef.current.src = "";
  };

  const sendAudio = async () => {
    if (audioUrl) {
      try {
        const response = await fetch(audioUrl);
        const audioBlob = await response.blob();
        setMessages((msgs) => [
          ...msgs,
          { text: "Audio message sent", sender: "user" },
        ]);
        const aiResponseJson = await sendAudioMessage(userId, audioBlob);
        if (aiResponseJson && aiResponseJson.response) {
          setMessages((msgs) => [
            ...msgs,
            { text: aiResponseJson.response, sender: "ai" },
          ]);
        } else {
          setMessages((msgs) => [
            ...msgs,
            { text: "Error processing audio message.", sender: "ai" },
          ]);
        }
      } catch (error) {
        console.error("Error sending audio message:", error);
        setMessages((msgs) => [
          ...msgs,
          { text: "Error processing audio message.", sender: "ai" },
        ]);
      }
      deleteAudio();
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 md:flex-row">
      <aside className="w-full md:w-16 bg-white border-b md:border-r border-gray-200">
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start py-2 md:py-4 px-4 md:px-0">
          <Button variant="ghost" className="md:mb-4">
            <Menu className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="md:mb-4">
            <PlusCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="md:mb-4">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="md:mb-4">
            <Clock className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="md:mt-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {suggestedPrompts.map((prompt, index) => (
                  <Card
                    key={index}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      handleSuggestedPrompt(prompt);
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
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
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
                    {message.audioUrl && (
                      <audio
                        controls
                        src={message.audioUrl}
                        ref={(el) => el && (el.playbackRate = 1.25)}
                        autoPlay
                      ></audio>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            {audioUrl ? (
              <div className="flex items-center space-x-2 w-full">
                <Button
                  onClick={isPlaying ? pauseAudio : playAudio}
                  variant="outline"
                >
                  {isPlaying ? (
                    <Square className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <div className="flex-grow h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{
                      width: `${
                        (audioRef.current.currentTime /
                          audioRef.current.duration) *
                          100 || 0
                      }%`,
                    }}
                  ></div>
                </div>
                <Button onClick={deleteAudio} variant="outline">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
                <Button
                  onClick={sendAudio}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter a prompt here"
                  className="w-full md:flex-1"
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSend}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleVoiceInput} variant="outline">
                    {isRecording ? (
                      <Square className="h-5 w-5 text-red-500" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
