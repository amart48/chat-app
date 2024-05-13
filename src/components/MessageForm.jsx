// Import necessary hooks and icons from React and Ant Design
import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
// Import functions from react-chat-engine for messaging functionality
import { sendMessage, isTyping } from 'react-chat-engine';

// Define the MessageForm component with props passed in
const MessageForm = (props) => {
// State hook for managing the input field value
const [value, setValue] = useState('');
// Destructure chatId and creds from props, used for sending messages and authentication
const { chatId, creds } = props;

// Handle changes in the input field
const handleChange = (event) => {
    // Update the state with the new input value
    setValue(event.target.value);
    // Notify the chat engine that the user is typing
    isTyping(props, chatId);
  };

// Handle the submission of the form
const handleSubmit = (event) => {
    // Prevent the default form submit action
    event.preventDefault();

    // Trim the input value to remove any leading/trailing whitespace
    const text = value.trim();

    // Send the message if there is any text after trimming
    if (text.length > 0) {
        sendMessage(creds, chatId, { text });
    }

    // Reset the input field after sending the message
    setValue('');
};

// Handle file uploads
const handleUpload = (event) => {
    // Send the selected file(s) as a message
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

// Render the message form
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
