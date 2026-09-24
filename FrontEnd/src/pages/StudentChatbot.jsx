import React, { useState, useRef, useEffect } from "react";
import { Copy, Send, Share } from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

import PageLoader from "../ui/PageLoader";

import useLoginData from "../features/Login/useLoginData";
import useData from "../features/User/useData";
import useUserData from "../features/User/useUserData";
import useQueryChatBot from "../features/ChatBot/useQueryChatBot";
import { useDispatch, useSelector } from "react-redux";
import { addQuery, addResponse } from "../features/ChatBot/chatBotSlice";

const ChatMain = () => {
  const chatbot = useSelector((state) => state.chatbot.conversations);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(chatbot);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");

  const { data: loginData, isLoading: loginLoading } = useLoginData();
  const { data, isLoading } = useUserData(loginData.username);
  const { data: details } = useData(loginData.username);
  const messagesEndRef = useRef(null);
  const { query } = useQueryChatBot();
  console.log(
    details?.data?.documents_uploaded[
      details?.data?.documents_uploaded?.length - 1
    ]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText, chatbot]);

  if (loginLoading || isLoading) return <PageLoader type="show" />;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    dispatch(addQuery(userMessage.text));
    setMessages((prev) => [...prev, [userMessage]]);
    setInput("");
    setIsTyping(true);
    setTypingText("");
    query(userMessage.text, {
      onSuccess: (data) => {
        setTimeout(() => {
          const fullText = data?.response;
          let index = -1;

          const typeChar = () => {
            if (index < fullText.length) {
              setTypingText((prev) => prev + fullText[index]);
              index++;
              setTimeout(typeChar, 10);
            } else {
              dispatch(addResponse(data.respone));
              setIsTyping(false);
              setMessages((prev) => {
                return prev.map((messageGroup, index) => {
                  if (
                    index === prev.length - 1 &&
                    messageGroup.length === 1 &&
                    messageGroup[0].sender === "user"
                  ) {
                    return [
                      ...messageGroup,
                      {
                        sender: "bot",
                        text: data.response,
                      },
                    ];
                  }
                  return messageGroup;
                });
              });
              setTypingText("");
            }
          };
          typeChar();
        }, 500);
      },
      onError: (err) => {
        dispatch(addResponse(err.message));
        setIsTyping(false);
        setTypingText("");
        setMessages((prev) => {
          return prev.map((messageGroup, index) => {
            if (
              index === prev.length - 1 &&
              messageGroup.length === 1 &&
              messageGroup[0].sender === "user"
            ) {
              return [
                ...messageGroup,
                {
                  sender: "bot",
                  text: err.message,
                },
              ];
            }
            return messageGroup;
          });
        });
      },
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleShare = (text) => {
    if (navigator.share) {
      navigator
        .share({ text })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  const renderWelcome = () => (
    <>
      <div className="px-8 pt-8">
        <h2 className="flex text-3xl justify-center items-center font-extrabold text-blue-600 drop-shadow">
          Edu Genie
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center text-center py-8">
        <img src="/image.png" alt="Genie" className="w-32 h-32 mb-5" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Hi, {data?.Name}
        </h2>
        <p className="text-lg text-gray-600 mt-1">
          Ask Edu Genie for one step academic solution
        </p>
      </div>
    </>
  );

  const renderMessages = () => (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      {messages.map((pair, idx) => (
        <div key={idx} className="space-y-4">
          {pair.map((msg, innerIdx) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={innerIdx}
                className={`w-full flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`text-base ${
                    isUser
                      ? "text-blue-900 font-semibold text-right"
                      : "text-gray-900 text-left"
                  }`}
                >
                  {isUser ? (
                    <div className="inline-block bg-blue-100 text-blue-900 rounded-2xl px-4 py-2 max-w-xs md:max-w-md shadow">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-left bg-white p-3 rounded-xl shadow border border-blue-100">
                      <ReactMarkdown
                        children={msg.text}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={{
                          table: ({ node, ...props }) => (
                            <table
                              className="my-4 table-auto w-full border border-slate-300 divide-x divide-slate-300"
                              {...props}
                            />
                          ),
                          thead: ({ node, ...props }) => (
                            <thead
                              className="bg-slate-100 text-left"
                              {...props}
                            />
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
                              {...props}
                            />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="border border-slate-200 px-3 py-2 text-sm"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc py-1 pl-5 space-y-2"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="text-sm text-gray-900" {...props} />
                          ),
                        }}
                      />
                    </div>
                  )}
                  <div
                    className={`mt-2 flex gap-3 text-sm ${
                      isUser ? "justify-end text-blue-500" : "text-gray-500"
                    }`}
                  >
                    <button
                      onClick={() => handleCopy(msg.text)}
                      className="hover:text-blue-600 flex items-center gap-1"
                    >
                      <Copy size={14} /> Copy
                    </button>
                    <button
                      onClick={() => handleShare(msg.text)}
                      className="hover:text-blue-600 flex items-center gap-1"
                    >
                      <Share size={14} /> Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          {typingText ? (
            <p className="text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-typing text-base font-medium whitespace-pre-line">
              {typingText}
            </p>
          ) : (
            <div className="flex items-center space-x-2 h-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]" />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );

  return (
    <div className="w-full h-[calc(100vh-120px)] px-4 md:px-8 py-6">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col rounded-3xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-2xl overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {/* Recently Uploaded Box */}
            {chatbot.length === 0 && (
              <div className="flex justify-center mt-4">
                <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-blue-300 text-sm text-gray-800 font-medium">
                  {details?.data?.documents_uploaded?.length === 0 ? (
                    "No documents uploaded yet"
                  ) : (
                    <>
                      <span>📄 Recently uploaded: </span>
                      <span className="text-blue-600 ml-1">
                        {
                          details?.data?.documents_uploaded[
                            details?.data?.documents_uploaded?.length - 1
                          ].name
                        }
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {messages.length === 0 ? renderWelcome() : renderMessages()}
          </div>
        </div>

        {!isTyping && (
          <div className="px-6 py-5 border-t bg-white/80 backdrop-blur-md">
            <div className="flex items-center border border-blue-300 rounded-xl px-4 py-3 bg-white shadow-sm">
              <input
                type="text"
                placeholder="Ask Edu Genie"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 text-sm bg-transparent focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="text-blue-600 hover:text-blue-800 p-2"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMain;
