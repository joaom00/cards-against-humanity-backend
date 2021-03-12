interface User {
  id: string;
  name: string;
  room: string;
}

const users = [] as Array<User>;

export const addUser = (id: string, name: string, room: string) => {
  const user = {
    id,
    name,
    room,
  };

  users.push(user);

  return user;
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id && user.name !== '');

  if (index !== -1) {
    return users.splice(index, 1)[0].room;
  }
};

export const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);
