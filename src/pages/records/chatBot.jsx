import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useState ,useEffect} from "react";
import { useUser,useClerk } from "@clerk/clerk-react";
import { GoogleGenerativeAI } from "@google/generative-ai";


export const ChatBot = () => {
    const { isSignedIn, isLoaded } = useUser();
     const clerk = useClerk();
     
    
      useEffect(() => {
        if (isLoaded && !isSignedIn) {
          clerk.redirectToSignIn();
          // redirectToSignIn(); // Automatically redirects unauthenticated users
        }
      }, [isLoaded, isSignedIn]);

  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInput = (value) => {
    console.log(value);
    setUserInput(value);
  };
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async (messageText) => {
    if (messageText.trim() === "") return;

    try {
      const prompt = messageText;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: messageText },
        { type: "bot", message: text },
      ]);
      setUserInput("");
      console.log(text);
    } catch (e) {
      console.log("Error occurred while fetching", e);
    }
  };

  return (
    <div className="flex flex-col  h-screen w-full bg-[#13131a] p-4"

    /* <div className="flex flex-col justify-center  h-screen bg-[#13131a] p-4" */
     style={{
            backgroundImage:"url('/chatbot.jpg')",
            // backgroundImage:  "url('https://img.freepik.com/premium-photo/digital-illustration-friendly-chatbot-avatar-with-speech-bubble-smartphone-screen-symbolizing-ai-customer-support_1019851-3964.jpg?w=1380')" // You can change this URL
            
            // backgroundImage: "url('https://blog.usetada.com/hs-fs/hubfs/AI%20Chatbots%20in%20loyalty%20programs.jpg?width=1185&height=617&name=AI%20Chatbots%20in%20loyalty%20programs.jpg')",
            backgroundSize: 'cover',
            height: '500px',
            width: '100%',

          }}
    >
     
      <div className="text-white text-2xl font-bold mb-4 ">What can I help with? 🙋🏻‍♀</div>
     
      <div
  className="flex-1 w-full sm:w-1/2 h-screen sm:h-[600px]"
  style={{ position: "relative" }}
>
  <MainContainer>
    <ChatContainer>
      <MessageList>
        {chatHistory.map((elt, i) => (
          <Message
            key={i}
            model={{
              message: elt.message,
              sender: elt.type,
              sentTime: "just now",
              direction: elt.type === "user" ? "outgoing" : "incoming",
            }}
          />
        ))}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={userInput}
        onChange={(value) => handleUserInput(value)}
        onSend={sendMessage}
      />
    </ChatContainer>
  </MainContainer>
</div>

    </div>
    
  );
}
