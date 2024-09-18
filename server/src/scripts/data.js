// Seed data for the Prisma schema
// Create some users
export const users = [
  {
    id: 1,
    username: 'johnDoe',
    email: 'john.doe@example.com',
    password: 'password123',
    avatarUrl: 'https://example.com/john-doe-avatar.jpg',
  },
  {
    id: 2,
    username: 'janeDoe',
    email: 'jane.doe@example.com',
    password: 'password123',
    avatarUrl: 'https://example.com/jane-doe-avatar.jpg',
  },
  {
    id: 3,
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    avatarUrl: 'https://example.com/admin-avatar.jpg',
  },
];

// Create some servers
export const servers = [
  {
    id: 1,
    name: 'My Server',
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Another Server',
    createdAt: new Date(),
  },
];

// Create some channels

// Create some memberships
export const memberships = [
  {
    id: 1,
    userId: 1,
    serverId: 1,
    joinedAt: new Date(),
  },
  {
    id: 2,
    userId: 2,
    serverId: 1,
    joinedAt: new Date(),
  },
  {
    id: 3,
    userId: 3,
    serverId: 2,
    joinedAt: new Date(),
  },
];

// Create some roles
export const roles = [
  {
    id: 1,
    name: 'Admin',
    serverId: 1,
  },
  {
    id: 2,
    name: 'Moderator',
    serverId: 1,
  },
  {
    id: 3,
    name: 'Member',
    serverId: 2,
  },
];
export const channels = [
  {
    id: 1,
    name: 'General',
    serverId: 1,
    isPrivate: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Private Channel',
    serverId: 1,
    isPrivate: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Another Channel',
    serverId: 2,
    isPrivate: false,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'Secret Room',
    serverId: 1,
    isPrivate: true,
    createdAt: new Date(),
    allowedUsers: [users[0], users[1]], // Users who can access
    allowedRoles: [roles[1]], // Moderator role can access
  },
];
// Create some role assignments
export const roleAssignments = [
  {
    id: 1,
    userId: 1,
    roleId: 1,
  },
  {
    id: 2,
    userId: 2,
    roleId: 2,
  },
  {
    id: 3,
    userId: 3,
    roleId: 3,
  },
];

// Create some messages
export const messages = [
  {
    id: 1,
    content: 'Hello, world!',
    userId: 1,
    channelId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    content: 'Hi, everyone!',
    userId: 2,
    channelId: 1,
    createdAt: new Date(),
  },
  {
    id: 3,
    content: 'This is a private message.',
    userId: 1,
    channelId: 2,
    createdAt: new Date(),
  },
];

// Create some reactions
export const reactions = [
  {
    id: 1,
    emoji: ':smile:',
    userId: 1,
    messageId: 1,
  },
  {
    id: 2,
    emoji: ':heart:',
    userId: 2,
    messageId: 1,
  },
  {
    id: 3,
    emoji: ':angry:',
    userId: 3,
    messageId: 2,
  },
];

// Create some direct messages
export const directMessages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    createdAt: new Date(),
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    createdAt: new Date(),
  },
  {
    id: 3,
    senderId: 3,
    receiverId: 1,
    createdAt: new Date(),
  },
];

// Create some direct message messages
export const directMessageMessages = [
  {
    id: 1,
    content: 'Hi, how are you?',
    userId: 1,
    directChatId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    content: "I'm good, thanks",
    userId: 2,
    directChatId: 1,
    createdAt: new Date(),
  },
  {
    id: 3,
    content: 'What about you?',
    userId: 1,
    directChatId: 2,
    createdAt: new Date(),
  },
  {
    id: 4,
    content: 'Catch up later?',
    userId: 3,
    directChatId: 3, // Link to the right direct message chat
    createdAt: new Date(),
  },
];
