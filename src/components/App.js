import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from '../styles/App.module.css';
import ConversationSidebar from '../components/ConversationSidebar';
import Home from '../components/Home';
import data from '../data';

class App extends Component {
  constructor() {
    super();

    const { currentUser, conversations } = data;
    this.state = {
      currentUser,
      conversations,
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
              <Route
                path="/conversations/:id"
                render={() => <h1>Show Conversation</h1>}
              />
              <Route path="/" component={Home} />
            </Switch>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
