import * as data from './data.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  // Create or update users
  for (const user of data.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }

  // Create or update servers
  for (const server of data.servers) {
    await prisma.server.upsert({
      where: { id: server.id },
      update: server,
      create: server,
    });
  }

  // Create or update roles
  for (const role of data.roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: role,
      create: role,
    });
  }

  // Check existing users and roles for logging
  const existingUsers = await prisma.user.findMany();
  const existingRoles = await prisma.role.findMany();
  console.log('Existing users:', existingUsers);
  console.log('Existing roles:', existingRoles);

  // Create or update channels
  for (const channel of data.channels) {
    const allowedUsers = channel.allowedUsers?.map((user) => ({ id: user.id }));
    const allowedRoles = channel.allowedRoles?.map((role) => ({ id: role.id }));

    // Log the users and roles being connected
    console.log('Channel ID:', channel.id);
    console.log('Allowed users to connect:', allowedUsers);
    console.log('Allowed roles to connect:', allowedRoles);

    await prisma.channel.upsert({
      where: { id: channel.id },
      update: {
        ...channel,
        allowedUsers: {
          connect: allowedUsers,
        },
        allowedRoles: {
          connect: allowedRoles,
        },
      },
      create: {
        ...channel,
        allowedUsers: {
          connect: allowedUsers,
        },
        allowedRoles: {
          connect: allowedRoles,
        },
      },
    });
  }

  // Create or update memberships
  for (const membership of data.memberships) {
    await prisma.membership.upsert({
      where: { id: membership.id },
      update: membership,
      create: membership,
    });
  }

  // Create or update role assignments
  for (const roleAssignment of data.roleAssignments) {
    await prisma.roleAssignment.upsert({
      where: { id: roleAssignment.id },
      update: roleAssignment,
      create: roleAssignment,
    });
  }

  // Create or update messages
  for (const message of data.messages) {
    await prisma.message.upsert({
      where: { id: message.id },
      update: message,
      create: message,
    });
  }

  // Create or update reactions
  for (const reaction of data.reactions) {
    await prisma.reaction.upsert({
      where: { id: reaction.id },
      update: reaction,
      create: reaction,
    });
  }

  // Create or update direct messages
  for (const directMessage of data.directMessages) {
    await prisma.directMessage.upsert({
      where: { id: directMessage.id },
      update: directMessage,
      create: directMessage,
    });
  }

  // Create or update direct message messages
  for (const directMessageMessage of data.directMessageMessages) {
    await prisma.message.upsert({
      where: { id: directMessageMessage.id },
      update: directMessageMessage,
      create: directMessageMessage,
    });
  }

  console.log('Seed data successfully added or updated!');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
