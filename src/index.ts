const Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3000

const sequelize = new Sequelize('postgres://user:pass@db:5432/db');

app.use(express.json())


// Models definition

// 'post' will be the name of the table in the model
// you can get the full documentation of model definition fields at
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types
// The following fields will be used implictly by Sequelize:
//   - id
//   - createdAt
//   - updatedAt
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

const Post = sequelize.define('post', {
    title: {
        type: Sequelize.STRING
      },
    content: {
        type: Sequelize.STRING
    }
});

const Tag = sequelize.define('tag', {
    "name": {
        type: Sequelize.STRING
    }
});

const ImagePost = sequelize.define('image', {
    "url": {
        type: Sequelize.STRING
    },
    "description": {
        type: Sequelize.STRING
    }
});

const Commentaire = sequelize.define('comment', {
    "content": {
        type: Sequelize.STRING
    }
});

// Helper functions

// Take an object and a list of attributes and return the payload to send to
// the client
function formatResult(obj, attributes) {
    let res = Object();

    for (let attribute of attributes) {
        res[attribute] = obj[attribute];
    }

    return res;
}

// Views - we are going to implement GET, PUST, POST and DELETE

function get(model, attributes) {
    return function(request, response) {
        model.findAll().then(function(objects) {
            let result = [];

            for (let obj of objects) {
                result.push(formatResult(obj, attributes));
            }

            response.json(result);
        })
    }
}

app.get('/v1/users', get(User, ["id", "username", "email"]));
app.get('/v1/posts', get(Post, ["id", "title", "content"]));
app.get('/v1/tags', get(Tag, ["id", "name"]));
app.get('/v1/images', get(ImagePost, ["id", "url", "description"]));
app.get('/v1/comments', get(Commentaire, ["id", "content"]));


function getOne(model, attributes) {
    return function(request, response) {
        // We must fetch the object from the database using it's id
        // http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-find-search-for-one-specific-element-in-the-database
        model.findById(request.params.id).then(function(obj) {
            if (obj != null) {
                // If an object is found, we format the response and return it
                // to the client
                response.json(formatResult(obj, attributes));
            } else {
                // If we did not find anything, we return an error
                response.status(404).json({"error": "Not found"});
            }
        })
    }
}

app.get('/v1/users/:id', getOne(User, ["id", "username", "email"]));
app.get('/v1/posts/:id', getOne(Post, ["id", "title", "content"]));
app.get('/v1/tags/:id', getOne(Tag, ["id", "name"]));
app.get('/v1/images/:id', getOne(ImagePost, ["id", "url", "description"]));
app.get('/v1/comments/:id', getOne(Commentaire, ["id", "content"]));



function create(model, attributes) {
    return function(request, response) {

        // We get the fields from the request body
        let data = Object();
        for (let attribute of attributes) {
            data[attribute] = request.body[attribute];
        }

        // We create a new object
        // http://docs.sequelizejs.com/manual/tutorial/instances.html#building-a-non-persistent-instance
        let obj = model.build(data);

        // Save it
        obj.save().then(function(result) {
            response.json(formatResult(result, attributes));
        })
    }
}

app.post('/v1/users/:id', create(User, ["id", "username", "email"]));
app.post('/v1/posts/:id', create(Post, ["id", "title", "content"]));
app.post('/v1/tags/:id', create(Tag, ["id", "name"]));
app.post('/v1/images/:id', create(ImagePost, ["id", "url", "description"]));
app.post('/v1/comments/:id', create(Commentaire, ["id", "content"]));


app.listen(port, function() {
    console.log(`Your app is listening on ${port}!`);
});
