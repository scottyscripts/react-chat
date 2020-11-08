import { useEffect, useState } from 'react';
import data from '../data';
import styles from '../styles/NewConversation.module.css';

function NewConversation(props) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data.users.filter((u) => u.id !== props.currentUser.id))
  }, [])

  const onSelectUser = (user) => {
    const selectedUserIndex = selectedUsers.indexOf(user);
    if (selectedUserIndex === -1) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    }
  }

  const onCreateConversation = () => {
    const id = props.createConversation(selectedUsers);

    props.history.push(`/conversations/${id}`)
  }

  return (    
    <div className={styles.container}>
      <h2>New Conversation</h2>
      <div className={styles.userListContainer}>
        {users.map((user) => {
          let classNames = styles.userContainer;

          if (selectedUsers.indexOf(user) > -1) {
            classNames += ` ${styles.selectedUserContainer}`;
          }

          return (
            <div
              key={user.id}
              className={classNames}
              onClick={() => onSelectUser(user)}
            >
              <img alt="User icon" src={user.iconUrl} className={styles.userIcon} />
              <h4 className={styles.userName}>{user.firstName} {user.lastName}</h4>
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <div className={styles.selectedUsersContainer}>
          {selectedUsers.map((user) => {
            return (
              <span
                key={user.id}
                className={styles.selectedUserTag}
                onClick={() => onSelectUser(user)}
              >
                {user.firstName} {user.lastName}
              </span>
            );
          })}
        </div>
        {selectedUsers.length > 0 && (
          <button className={styles.btnCreateConversation} onClick={onCreateConversation}>Create</button>
        )}
      </div>
    </div>
  )
}

export default NewConversation;