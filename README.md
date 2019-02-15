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

And we can delete objects bymaking DELETE calls to:
- `/v1/users/[id]`
- `/v1/posts/[id]`
- `/v1/tags/[id]`
- `/v1/images/[id]`
- `/v1/comments/[id]`


# What's next

The last thing we need is to be able to update a specific object.

You already know how to get the data sent by the client since you did it for
the POST method.

This time we will need to the the object from the database, update each of its
attributes and save it back.

You should be able to write this method by mixing what you have done for all the
others.
