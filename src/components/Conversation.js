import { Component, Fragment } from 'react';
import styles from '../styles/Conversation.module.css';
import { SentMessage, ReceivedMessage } from '../components/Messages';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
    }
  }

  onMessageTextChange = (event) => {
    this.setState({ messageText: event.target.value });
  }

  onSendMessage = (event) => {
    event.preventDefault();
    
    this.props.sendMessage(
      this.props.conversation.id,
      this.state.messageText,
      this.props.currentUser.id,
      true
    );
    this.setState({ messageText: '' });
  }

  render() {
    const { messages } = this.props.conversation;
    const users = this.props.conversation.users.filter((u) => u.id !== this.props.currentUser.id);
    const headerTitle = users.map((user) => {
      return `${user.firstName} ${user.lastName.charAt(0)}`;
    }).join(', ');
    
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={users[0].iconUrl} className={styles.userIcon} alt="User icon" />
          <h2>{headerTitle}</h2>
        </div>
        <div className={styles.messagesContainer}>
          {messages.map((message, i) => {
            const isMyMessage = message.userId === this.props.currentUser.id;

            let messageComponent;
            if (isMyMessage) {
              messageComponent = (
                <SentMessage message={message} currentUser={this.props.currentUser} />
              );
            } else {
              const sender = users.find((u) => u.id === message.userId);

              messageComponent = (
                <ReceivedMessage
                  message={message}
                  sender={sender}
                />
              );
            }

            return (
              <Fragment key={i}>
                {messageComponent}
              </Fragment>
            );
          })}
        </div>
        <div className={styles.messageTextContainer}>
          <textarea
            value={this.state.messageText}
            onChange={this.onMessageTextChange}
            placeholder="Type your message..."
            className={styles.messageText}
          />
          <button onClick={this.onSendMessage} className={styles.btnSendMessage}>Send</button>
        </div>
      </div>
    )
  }
}

export default Conversation;