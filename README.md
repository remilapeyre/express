# What's next

Now that our API returns a list of objects on
- `/v1/users`
- `/v1/posts`
- `/v1/tags`
- `/v1/images`
- `/v1/comments`

We would like to be able to fetch the details of only one object at those URL:
- `/v1/users/[id]`
- `/v1/posts/[id]`
- `/v1/tags/[id]`
- `/v1/images/[id]`
- `/v1/comments/[id]`

Remember that with Express, you can create a new endpoint by doing:
``` javascript
app.get('/v1/my_new_route', function_to_call);

// Take the time to read https://expressjs.com/en/guide/routing.html
// for more information
```

You will need to know the id of the resource the user wants to call (`/v1/posts/1`,
`/v1/posts/2`, ...).

To do so, you can use **route parameters** (https://expressjs.com/en/guide/routing.html#route-parameters)
like so:
``` javascript
app.get('/v1/posts/:id', function(request, response) {
    // the id in the route will be accessible at:
    // request.params.id
})
```

Once you know the id you need to fetch, you can get it from Sequelize with
the `findById` method (http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-find-search-for-one-specific-element-in-the-database):
``` javascript
Post.findById(my_id).then(function(post) {
    // post will be the object from the database
    // if the id did not exist, post will be `null`
})
```

Remember that if an id does not exists, you must return an error 404.
