import { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import moment from 'moment';
import styles from '../styles/App.module.css';
import ConversationSidebar from '../components/ConversationSidebar';
import Conversation from '../components/Conversation';
import NewConversation from '../components/NewConversation';
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
      const conversation = prevState.conversations[conversationIndex];
      
      const newMessageId = utils.getRandomInt(1, 1000);
      const newMessage = {
        id: newMessageId,
        text: text,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ssZ'),
        userId: senderId
      };

      conversation.messages.unshift(newMessage);

      return {conversations: prevState.conversations};
    });

    if (sendReply) {
      // send response between 1 - 60 seconds
      const sendInterval = utils.getRandomInt(1 * 1000, 60 * 1000);
      // get "random" sender from current conversation
      const sender = (
        utils.shuffleArray(this.state.conversations[conversationIndex].users)
          .find((u) => u.id !== this.state.currentUser.id)
      );
      
      // grab "random" user response
      const responseIndex = (utils.getRandomInt(0, sender.responses.length));
      const responseText = sender.responses[responseIndex];
      setTimeout(() => {
        this.sendMessage(conversationId, responseText, sender.id)
      }, sendInterval);
    }
  }

  createConversation = (users) => {
    const newConversationId = (this.state.conversations.length + 1);
    const newConversation = {
      id: newConversationId,
      messages: [],
      users,
    };

    this.setState((prevState) => (
      {conversations: [...prevState.conversations, newConversation]}
    ));

    return newConversationId;
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
                render={({ history }) => (
                  <NewConversation
                    history={history}
                    currentUser={this.state.currentUser}
                    createConversation={this.createConversation}
                  />
                )}
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
