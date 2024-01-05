import Conversation from "../components/conversation/Conversation"
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import Message from "../components/message/Message";
import Loader from "../components/loader/Loader";
import Input from "../components/input/Input";
import Styles from './pages.module.css'

const Messages = () => {
  const { loading, conversations, unread, messages, activeConversation, setActiveConversation, handleSendMessage, newMessageToSend, setNewMessageToSend } = useContext(SocketContext);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (endOfMessagesRef.current) {
        const scrollHeight = endOfMessagesRef.current.scrollHeight;
        endOfMessagesRef.current.scrollTop = scrollHeight;
      }
    };
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  return (
    <main className="main">
      {loading ? (
        <Loader />
      ) : (
        <>
          {
            conversations.length === 0 && (
              <section className={Styles.message}>
                <p>No hay conversaciones</p>
              </section>
            )
          }
          {
            conversations.map((conversation) => (
              <section key={conversation._id} className={`${Styles.message} ${unread[conversation._id] ? Styles.unread : ''}`}>
                <Conversation conversation={conversation} onClick={() => setActiveConversation(conversation)} />
                {activeConversation && activeConversation._id === conversation._id &&
                  <div className={Styles.message_container} ref={endOfMessagesRef}>
                    {messages[activeConversation._id]?.map(message => (
                      <Message key={message._id} message={message} />
                    )
                    )}
                    <Input
                      type="text"
                      value={newMessageToSend}
                      placeholder="Escribe un mensaje..."
                      onClick={() => handleSendMessage(conversation.participants[0]._id, newMessageToSend)}
                      onChange={(e) => setNewMessageToSend(e.target.value)}
                    />
                  </div>
                }
              </section>
            ))
          }
        </>
      )}
    </main>
  )
}

export default Messages