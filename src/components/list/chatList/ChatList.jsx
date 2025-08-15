import { useState, useEffect } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";


const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("chatList"); // Tela atual

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data()?.chats || [];

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updateAt - a.updateAt));
    });

    return () => unSub();
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map(({ user, ...rest }) => rest);
    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
    if (chatIndex >= 0) userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatsRef, { chats: userChats });
      changeChat(chat.chatId, chat.user);
      setCurrentScreen("chatDetail"); 
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />

        {currentScreen === "chatList" && (
          <button className="logout" onClick={() => auth.signOut()}>
            Sair
          </button>
        )}
      </div>

      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5193be",
          }}
        >
          <img src={chat.user.avatar || "./arquivo.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
