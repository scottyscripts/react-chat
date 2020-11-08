import moment from 'moment';
import styles from '../styles/Messages.module.css';

function Timestamp({ timestamp, align }) {
  const now = moment();
  let momentTime = moment(timestamp);
  const displayTime = momentTime.format('h:mm a');

  if (!align || !['left', 'right'].includes(align)) {
    align = 'left';
  }

  let display;
  if (now.isSame(momentTime, 'day')) {
    display = `Today at ${displayTime}`
  } else if (momentTime.isSame(now.subtract(1, 'day'), 'day')) {
    display = `Yesterday at ${displayTime}`
  } else if (now.startOf('day').isSame(momentTime, 'week')) {
    display = `${momentTime.format('ddd')} at ${displayTime}`
  } else {
    display = `${momentTime.format('MM/D/YY')} at ${displayTime}`
  }

  return (
    <p style={{ textAlign: align }} className={styles.timestamp}>{display}</p>
  )
}

function SentMessage({ message, currentUser }) {
  const currentUserInitials = `${currentUser.firstName.charAt(0)} ${currentUser.lastName.charAt(0)}`;

  return (
    <div className={styles.sentMessageContainer}>
      <div className={styles.messageInfo}>
        <p className={`${styles.message} ${styles.sentMessage}`}>
          {message.text}
        </p>
        {/* QUESTION - Should sent messages have timestamp and initials? (Requirements mention:
          "Each message in a conversation displays a timestamp, user icon, and message text
          but wireframe doesn't show these for sent messages.) */}
        <Timestamp timestamp={message.timestamp} align="right" />
      </div>
      <div className={styles.sentMessageInitials}>
        <span>{currentUserInitials}</span>
      </div>
    </div>
  );
}

function ReceivedMessage({ message, sender }) {
  const senderInitials = `${sender.firstName.charAt(0)} ${sender.lastName.charAt(0)}`;

  return (
    <div className={styles.receivedMessageContainer}>
      <div className={styles.receivedMessageInitials}>
        <span>{senderInitials}</span>
      </div>
      <div className={styles.messageInfo}>
        <p className={`${styles.message} ${styles.receivedMessage}`}>
          {message.text}
        </p>
        <Timestamp timestamp={message.timestamp} />
      </div>
    </div>
  );
}

export {
  SentMessage,
  ReceivedMessage,
}