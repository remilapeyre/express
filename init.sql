CREATE TABLE users (
    "id" integer PRIMARY KEY,
    "username" text,
    "email" text,
    "createdAt" timestamp,
    "updatedAt" timestamp
);

CREATE TABLE posts (
    "id" integer PRIMARY KEY,
    "title" text,
    "content" text,
    "author" integer REFERENCES users(id),
    "createdAt" timestamp,
    "updatedAt" timestamp
);

CREATE TABLE tags (
    "id" integer PRIMARY KEY,
    "name" text,
    "post" integer REFERENCES posts(id),
    "createdAt" timestamp,
    "updatedAt" timestamp
);

CREATE TABLE images (
    "id" integer PRIMARY KEY,
    "url" text,
    "post" integer REFERENCES posts(id),
    "description" text,
    "createdAt" timestamp,
    "updatedAt" timestamp
);

CREATE TABLE comments (
    "id" integer PRIMARY KEY,
    "post" integer REFERENCES posts(id),
    "author" integer REFERENCES users(id),
    "content" text,
    "createdAt" timestamp,
    "updatedAt" timestamp
);
