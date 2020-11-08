const users = [
  {
    id: 1,
    firstName: 'Nick',
    lastName: 'Fury',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/11/050/16352.jpg?v=1554181254',
  },
  {
    id: 2,
    firstName: 'Tony',
    lastName: 'Stark',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/10/050/85.jpg?v=1578809430',
  },
  {
    id: 3,
    firstName: 'Steve',
    lastName: 'Rogers',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/10/050/274.jpg?v=1599853488',
  },
  {
    id: 4,
    firstName: 'Natasha',
    lastName: 'Romanova',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/10/050/248.jpg?v=1595053219',
  },
  {
    id: 5,
    firstName: 'Groot',
    lastName: 'Tree',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/11/050/12501.jpg?v=1543340980',
  },
  {
    id: 6,
    firstName: 'Wade',
    lastName: 'Wilson',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/10/050/835.jpg?v=1574190685',
  },
  {
    id: 7,
    firstName: 'Logan',
    lastName: 'Howlett',
    iconUrl: 'https://www.superherodb.com/pictures2/portraits/10/050/161.jpg?v=1594898579',
  },
]

const currentUser = users[0];

const conversations = [
  {
    id: 1,
    users: [
      currentUser,
      users[2]
    ],
    messages: [
      {
        text: 'It\'s been a while, how have you been?',
        timestamp: '2020-10-10',
        userId: users[2].id
      },
      {
        text: 'Things have been quiet here.',
        timestamp: '2020-10-10',
        userId: currentUser.id
      },
    ]
  },
  {
    id: 2,
    users: [
      currentUser,
      users[4],
    ],
    messages: [
      {
        text: 'I am Groot.',
        timestamp: '2020-10-10',
        userId: users[4].id
      }
    ]
  }
]

export default {
  users,
  currentUser,
  conversations,
}