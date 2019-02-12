const Sequelize = require('sequelize');
const express = require('express')
const app = express()
const port = 3000

const sequelize = new Sequelize('postgres://user:pass@db:5432/db');

// 'post' will be the name of the table in the model
// you can get the full documentation of model definition fields at
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types
const Post = sequelize.define('post', {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    }
});

app.get('/v1/posts', function(request, response) {

    Post.findAll().then(function(posts) {
        let result = [];

        for (let post of posts) {
            result.push({
                title: post.title,
                content: post.content
            });
        }

        response.json(result);
        // or set the status with:
        // response.status(404).json(result);
    });

});

app.listen(port, function() {
    console.log(`Your app is listening on ${port}!`);
});
