import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

// Define the ChatFeed component with props passed in
const ChatFeed = (props) => {
    // Destructure necessary properties from props
    const { chats, activeChat, userName, messages } = props;

    // Get the current chat object using the activeChat identifier
    const chat = chats && chats[activeChat];

    // Function to render read receipts based on whether the message has been read by each chat participant
    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
        key={`read_${index}`}
        className="read-receipt"
        style={{
            float: isMyMessage ? 'right' : 'left',
            backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
        }}
    />
  ));

    // Function to render messages in the chat
    const renderMessages = () => {

    // Extract keys from messages object
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
        // Get message by key
        const message = messages[key];
        // Determine the key of the last message
        const lastMessageKey = index === 0 ? null : keys[index - 1];
        // Check if the current user sent the message 
        const isMyMessage = userName === message.sender.username;

    return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
            <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
            </div>
            <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
            </div>
        </div>
      );
    });
  };
  // Return early with an empty div if no chat is active or found
  if (!chat) return <div />;

  // Main chat feed rendering
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;