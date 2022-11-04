export const routes = {
  index: () => "/",
  room: (id?: string) => (id ? `/room/${id}` : "/room/:id"),
};
