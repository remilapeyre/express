Great, we now can list objects on:
- `/v1/users`
- `/v1/posts`
- `/v1/tags`
- `/v1/images`
- `/v1/comments`

And fetch information about a specific object at:
- `/v1/users/[id]`
- `/v1/posts/[id]`
- `/v1/tags/[id]`
- `/v1/images/[id]`
- `/v1/comments/[id]`

We also can create some new objects by sending a POST request at:
- `/v1/users`
- `/v1/posts`
- `/v1/tags`
- `/v1/images`
- `/v1/comments`


# What's next

We would like to be able to destroy an object present in the database.

You already know how to call a different function based the method of the incoming
request with Express. You need to call a knew function for DELETE methods.

If you don't remember how to do it, look at the precedent exercises or read the
documentation at https://expressjs.com/en/guide/routing.html


When the client wants to delete something, he will need to indicate the id of the
object he wants to destroy by indicating it in the route, like he did for fetching
details about an object (e.g. `/v1/posts/1`, `/v1/posts/2`, etc.)

You will first need to fetch the object from the database (remember to return an
error 404 if there is nothing with this id).

Once you got the object you can call `.destroy()` to remove it from the database:
``` javascript
// http://docs.sequelizejs.com/manual/tutorial/instances.html#destroying-deleting-persistent-instances

obj.destroy().then(function() {
    // the object has been removed
})
```
