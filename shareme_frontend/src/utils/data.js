export const fetchUserQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};
