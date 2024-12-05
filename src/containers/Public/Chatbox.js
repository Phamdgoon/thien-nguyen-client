import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { apiChat } from "../../services/user";

const Chatbox = ({ onClose }) => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        const newChatHistory = [...chatHistory, { sender: "user", message }];
        setChatHistory(newChatHistory);

        try {
            const response = await apiChat(message);

            setChatHistory([
                ...newChatHistory,
                { sender: "bot", message: response.data.data },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory([
                ...newChatHistory,
                { sender: "bot", message: "Có lỗi xảy ra. Vui lòng thử lại!" },
            ]);
        }
        setMessage("");
    };

    return (
        <div className="fixed bottom-16 right-6 w-[320px] h-[400px] bg-white shadow-lg rounded-md flex flex-col z-50">
            <div className="flex justify-between items-center p-4 bg-[#ED1651] text-white rounded-t-md">
                <span className="font-bold">Hộp thoại hỗ trợ</span>
                <button onClick={onClose}>
                    <IoCloseOutline size={24} />
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {chatHistory.length === 0 ? (
                    <p className="text-gray-600">
                        Chào mừng bạn! Hãy nhập câu hỏi của bạn.
                    </p>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`${
                                chat.sender === "user"
                                    ? "text-right"
                                    : "text-left"
                            } mb-2`}
                        >
                            <div
                                className={`${
                                    chat.sender === "user"
                                        ? "bg-[#ED1651]"
                                        : "bg-gray-200"
                                } p-2 rounded-md inline-block`}
                            >
                                <p
                                    className={`${
                                        chat.sender === "user"
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    {chat.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-4 border-t flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1651]"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 p-2 bg-[#ED1651] text-white rounded-md"
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default Chatbox;
