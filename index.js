const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String     
  }

  type Comment {
    postId: Int
    id: Int
    name: String
    email: String
    body: String
  }

  type Album {
    userId: Int
    id: Int
    title: String
  }

  type Photo {
    albumId: Int
    id: Int
    title: String
    url: String
    thumbnailUrl: String
  }

  type Todo {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }

  type User {
    id: Int
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geo
  }

  type Geo {
    lat: Float
    lng: Float
  }

  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type Query {
    posts: [Post]
    comments: [Comment]
    albums: [Album]
    photos: [Photo]
    todos: [Todo]
    users: [User]
  }
`;

const resolvers = {
    Query: {
        posts: () => get("posts").then(res => res.data),
        comments: () => get("comments").then(res => res.data),
        albums: () => get("albunms").then(res => res.data),
        photos: () => get("photos").then(res => res.data),
        todos: () => get("todos").then(res => res.data),
        users: () => get("users").then(res => res.data)
    },
};

function get(name) {
    return axios.get('https://jsonplaceholder.typicode.com/' + name);
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server listening at ${url}`);
});