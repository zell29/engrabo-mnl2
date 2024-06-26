import React, { useEffect, useState } from 'react';
import { backend_url, server } from '../../server';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import styles from '../../styles/style';
import { GrGallery } from 'react-icons/gr';
import socketIO from 'socket.io-client';
import { format } from 'timeago.js';
const ENDPOINT = 'http://localhost:4000/';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const DashboardMessages = () => {
  const { admin } = useSelector((state) => state.admin);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socketId.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-admin/${admin?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [admin, messages]);

  useEffect(() => {
    if (admin) {
      const adminId = admin?._id;
      socketId.emit('addUser', adminId);
      socketId.on('getUsers', (data) => {
        setOnlineUsers(data);
      });
    }
  }, [admin]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== admin?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  // Get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // Create new messages
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: admin._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== admin._id
    );

    socketId.emit('sendMessage', {
      senderId: admin._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== '') {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit('updateLastMessage', {
      lastMessage: newMessage,
      lastMessageId: admin._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: admin._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll hide-scrollbar rounded">
      {/* All messages list */}
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins ">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={admin._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}
      {open && (
        <AdminInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          adminId={admin._id}
          userData={userData}
          setMessages={setMessages}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  setActiveStatus(online);
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, setUser]);

  return (
    <div
      className={`w-full flex p-3 py-3 ${
        active === index ? 'bg-[#00000010]' : 'bg-transparent'
      } cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${backend_url}/${user?.avatar?.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[1px] right-[1px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#b5b5ac] rounded-full absolute top-[1px] right-[1px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="font-[600]">{userData?.name}</h1>
        <p className="text-[14px] text-[#000000a1]">
          {data?.lastMessageId !== user?._id
            ? 'You'
            : user?.name.split(' ')[0] + ' '}
          : {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const AdminInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  adminId,
  userData,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#b19b56]">
        <div className="flex">
          <img
            src={`${backend_url}/${userData?.avatar?.url}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600] text-[#171203]">
              {userData?.name}
            </h1>
            <h1>{activeStatus ? 'Active Now' : ''}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll hide-scrollbar">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index} // It's good to use a unique key for each child in a list
              className={`flex w-full my-2 ${
                item.sender === adminId ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* For messages from others, include the image to the left */}
              {item.sender !== adminId && (
                <img
                  src={`${backend_url}/${userData?.avatar?.url}`}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full mr-3"
                />
              )}

              {/* Text container */}
              <div
                className={`flex flex-col w-max ${
                  item.sender === adminId ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    item.sender === adminId ? 'bg-[#000]' : 'bg-[#b19a5696]'
                  } text-[#fff]`}
                >
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text-[#000000d3] pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Send Message */}
      <form
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[3%]">
          <GrGallery className="cursor-pointer" size={20} fill="#171203" />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message..."
            className={`${styles.input} placeholder-[#9e8a4f] pl-3 !h-[40px]`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className="absolute right-4 top-5 cursor-pointer"
              fill="#171203"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
export default DashboardMessages;
