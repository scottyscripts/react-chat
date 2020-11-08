import styles from '../styles/Messages.module.css';

function SentMessage({ message }) {
  return (
    <p className={`${styles.message} ${styles.sentMessage}`}>
      {message.text}
    </p>
  );
}

function ReceivedMessage({ message, sender }) {
  const senderInitials = `${sender.firstName.charAt(0)} ${sender.lastName.charAt(0)}`;

  return (
    <div className={styles.receivedMessageContainer}>
      <div className={styles.receivedMessageInitials}>
        <span>{senderInitials}</span>
      </div>
      <div>
        <p className={`${styles.message} ${styles.receivedMessage}`}>
          {message.text}
        </p>
        <span>{message.timestamp}</span>
      </div>
    </div>
  );
}

export {
  SentMessage,
  ReceivedMessage,
}