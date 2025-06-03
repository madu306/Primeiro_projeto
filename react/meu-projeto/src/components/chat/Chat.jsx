import "./chat.css"
import {useEffect, useRef, useState} from "react";  

const Chat = () => {
const endRef = useRef(null)

useEffect(() => {
  endRef.current?.scrollIntoView({ behavior: "smooth"}); 
}, []); 

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Repellat perspiciatis magnam vel 
            </p>
            <span>1 min ago</span>
          </div>
        </div>
         <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Repellat perspiciatis magnam vel 
            </p>
            <span>1 min ago</span>
          </div>
        </div>
         <div className="message"> 
          <img src="./avatar.png" alt="" />         
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Repellat perspiciatis magnam vel 
            </p>
            <span>1 min ago</span>
          </div>
        </div>
         <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Repellat perspiciatis magnam vel 
            </p>
            <span>1 min ago</span>
          </div>
        </div>
         <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Repellat perspiciatis magnam vel 
            </p>
            <span>1 min ago</span>
          </div>
          <div ref={endRef}></div>
        </div>
      <div className="bottom"> 
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="type a message..."/>
        <div className="emoji">
          <img src="./emoji.png" alt="" />  
        </div>
        <button className="sendButton">Send</button>
      </div>
     </div> 
    </div>
  )
}

export default Chat




