import React, { useEffect, useState } from 'react';
import { server } from '../../server';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai';
import styles from '../../styles/style';
import { GrGallery } from 'react-icons/gr';

const DashboardMessages = () => {
  const { admin } = useSelector((state) => state.admin);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-admin/${admin._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [admin._id]);

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
              />
            ))}
        </>
      )}
      {open && <AdminInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-full flex p-3 py-3 ${
        active === index ? 'bg-[#00000010]' : 'bg-transparent'
      } cursor-pointer`}
      onClick={(e) => setActive(index) || handleClick(data._id)}
    >
      <div className="relative">
        <img
          src="http://localhost:8000/Guibone_Picture-1714913460264-340949950.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[1px] right-[1px]" />
      </div>
      <div className="pl-3">
        <h1>Raymond Dave Guibone</h1>
        <p className="text-[16px] text-[#000c]">You: Yeah I am good</p>
      </div>
    </div>
  );
};

const AdminInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#b19b56]">
        <div className="flex">
          <img
            src="http://localhost:8000/Guibone_Picture-1714913460264-340949950.png"
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600] text-[#171203]">
              Raymond Dave Guibone
            </h1>
            <h1>Active now</h1>
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
        <div className="flex w-full my-2">
          {/* Images */}
          <img
            src="http://localhost:8000/Guibone_Picture-1714913460264-340949950.png"
            alt=""
            className="w-[40px] h-[40px] rounded-full mr-3"
          />

          {/* Text */}
          <div className="w-max p-2 rounded bg-[#b19a5696] h-min">
            <p>Hello there!</p>
          </div>
        </div>
        <div className="flex justify-end w-full  my-2">
          {/* Text */}
          <div className="w-max p-2 rounded bg-[#b19a5696] h-min">
            <p>Hi!</p>
          </div>
        </div>
      </div>

      {/* Send Message */}
      <form className="p-3 relative w-full flex justify-between items-center">
        <div className="w-[3%]">
          <GrGallery className="cursor-pointer" size={20} fill="#171203" />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            className={`${styles.input} placeholder-[#9e8a4f] pl-3 !h-[40px]`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label>
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
