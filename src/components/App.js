import { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styles from '../styles/App.module.css';
import ConversationSidebar from '../components/ConversationSidebar';
import Conversation from '../components/Conversation';
import Home from '../components/Home';
import data from '../data';
import utils from '../utils';

class App extends Component {
  constructor() {
    super();

    const { currentUser, conversations } = data;
    this.state = {
      currentUser,
      conversations,
    }
  }

  sendMessage = (conversationId, text, senderId, sendReply=false) => {
    const conversationIndex = this.state.conversations.findIndex((c) => c.id === conversationId);

    this.setState((prevState) => {
      const conversationsCopy = prevState.conversations;
      
      const message = {
        id: 222,
        text: text,
        timestamp: '2020-10-10',
        userId: senderId,
      };

      conversationsCopy[conversationIndex].messages.unshift(message);

      return {conversations: conversationsCopy};
    });

    if (sendReply) {
      const sendInterval = utils.getRandomInt(1 * 1000, 60 * 1000);
      setTimeout(() => {
        const sender = this.state.conversations[conversationIndex].users.find((u) => u.id !== this.state.currentUser.id);
        this.sendMessage(conversationId, 'Hello there', sender.id)
      }, sendInterval);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <BrowserRouter>
          <ConversationSidebar
            conversations={this.state.conversations}
            currentUser={this.state.currentUser}
          />
          <div className={styles.colContainer}>
            <Switch>
              <Route
                path="/conversations/new"
                render={() => <h1>New Conversation</h1>}
              />
              <Route path="/conversations/:id" render={({ match }) => {
                const id = parseInt(match.params.id);
                const conversation = this.state.conversations.find((c) => c.id === id);
                if (conversation) {
                  return (
                    <Conversation
                      conversation={conversation}
                      currentUser={this.state.currentUser}
                      sendMessage={this.sendMessage}
                    />
                  );
                } else {
                  return <Redirect to="/" />;
                }
              }} />
              <Route path="/" component={Home} />
            </Switch>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
