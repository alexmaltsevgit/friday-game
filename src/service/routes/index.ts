export const routes = {
  index: () => "/",
  room: (id?: string) => (id !== undefined ? `/room/${id}` : "/room/:id"),
  join: (id?: string) => (id !== undefined ? `/join/${id}` : "/join/:id?"),
};
