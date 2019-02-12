const Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3000

const sequelize = new Sequelize('postgres://user:pass@db:5432/db');


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


// Views

function get(model, attributes) {
    return function(request, response) {
        model.findAll().then(function(objects) {
            let result = [];

            for (let obj of objects) {
                let res = new Object();
                for (let attribute of attributes) {
                    res[attribute] = obj[attribute];
                }

                result.push(res);
            }

            response.json(result);
        })
    }
}

app.get('/v1/users', get(User, ["username", "email"]));
app.get('/v1/posts', get(Post, ["title", "content"]));
app.get('/v1/tags', get(Tag, ["name"]));
app.get('/v1/images', get(ImagePost, ["url", "description"]));
app.get('/v1/comments', get(Commentaire, ["content"]));

app.listen(port, function() {
    console.log(`Your app is listening on ${port}!`);
});
