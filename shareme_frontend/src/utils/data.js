export const fetchUserQuery = (userId) => {
  return `*[_type == "user" && _id == "${userId}"]`;
};

export const fetchPinsQuery = (searchTerm) => {
  return `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*"]{
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;
};

export const fetchAllPins = `*[_type == 'pin'] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;
