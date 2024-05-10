

const MessageForm = () => {
    
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
            className="message-input" 
            placeholder="Send a message"
            value={value}
            onChange={handleChange}

            />
        </form>
    );
}

export default MessageForm;