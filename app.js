// const express = require('express');
// const app = express();
// const graphqlHTTP = require('express-graphql');
// const schema =  require('./schema/schema');

// // middle ware 
// app.use('/graphql',graphqlHTTP({
//     schema,
//     graphiql:true
// }))


// app.listen(4000,()=>{
//     console.log('port is running')
// })
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});