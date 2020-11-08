import { NavLink } from 'react-router-dom';
import styles from '../styles/ConversationSidebar.module.css';

function ConversationSidebar({ conversations, currentUser }) {
  const activeNavLinkStyles = { color: 'black' };
  const activeNewConversationStyles = { backgroundColor: '#5ebdc1', color: 'white' };
  
  return (
    <div className={styles.container}>
      {conversations.map((conversation) => {
        const users = conversation.users.filter((u) => u.id !== currentUser.id);
        let displayName = `${users[0].firstName} ${users[0].lastName.charAt(0)}`;

        if (users.length > 1) {
          displayName += ` (+${users.length - 1} others)`
        }
        const lastMessageText = conversation.messages[0].text;
        const maxSnippetLength = 20;
        let displayMessage;
        if (lastMessageText.length > maxSnippetLength) {
          displayMessage = `${lastMessageText.substring(0, maxSnippetLength)}...`
        } else {
          displayMessage = lastMessageText;
        };

        return (
          <NavLink
            key={conversation.id}
            to={`/conversations/${conversation.id}`}
            className={styles.conversationLink}
            activeStyle={activeNavLinkStyles}
          >
            <img alt="User icon" src={users[0].iconUrl} className={styles.userIcon} />
            <div className={styles.infoContainer}>
              <p className={styles.info}>{displayName}</p>
              <p className={`${styles.info} ${styles.infoSm}`}>{displayMessage}</p>
            </div>
          </NavLink>
        );
      })}
      <NavLink
        to="/conversations/new"
        activeStyle={activeNewConversationStyles}
        className={styles.btnNewConversation}
      >
        New Conversation
      </NavLink>
    </div>
  );
}

export default ConversationSidebar