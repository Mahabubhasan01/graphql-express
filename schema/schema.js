const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
var _ = require("lodash");

var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "4", authorId: "4" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "5" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "6" },
];
var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
  { name: "Patrick Rothfuss", age: 44, id: "4" },
  { name: "Brandon Sanderson", age: 42, id: "5" },
  { name: "Terry Pratchett", age: 66, id: "6" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
        type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code get in db
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code get in db
        return _.find(authors, { id: args.id });
      },
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return books;
      }
      
    }
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
