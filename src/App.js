import { ChatEngine } from "react-chat-engine";

import ChatFeed from './components/ChatFeed';

import './App.css';

const App = () => {
    return (
        <ChatEngine 
            height= "100vh"
            projectID="6235cfe5-bd5b-412e-8c7e-ad2ba2903c2f"
            userName="Adrian"
            userSecret="258159"
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} /> }
        />
    );
}

export default App;