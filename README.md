DatQL (DQL)
===========

An Introduction
---------------

### What is DatQL?
DatQL (a working title short for Data Query Language and pronounced *dat-quill*) is a 
[GraphQL](http://graphql.org/)-inspired markup language that compiles to vanilla SQL. While this library is still highly 
experimental, DatQL supports basic SQL operations such as querying, inserting, updating, and even nested join statements.
So instead of writing this:

```sql
SELECT
  user_id
FROM text_messages
  INNER JOIN (SELECT
                users.id AS user_id
              FROM users) ON (users.id = text_messages.user_id)) AS users
WHERE (conversation_id = 5)
```

You can write this:

```
query getUserTextMessages($conversation_id) {
    text_messages(conversation_id = $conversation_id) {
        ...on users(id = text_messages.user_id) {
            id[user_id]
        }
    }
}
```

### “So... what's the point?”
Right now you're probably thinking *“Big whoop man. Who the hell cares? SQL ain't that difficult.”* Well, let's talk 
database abstraction for a minute. Say you don't want to get bogged down in the specifics of a database language, seeing
you might switch over to a different database in the future. After all, *all query languages are slightly different*. 
What are your current options?

1. Use object-relational mapping (ORM), such as [Laravel](https://laravel.com/) or [Ruby on Rails](http://rubyonrails.org/),
 or even something like [SQLAlchemy](http://docs.sqlalchemy.org/en/latest/orm/) or [Sequelize](http://docs.sequelizejs.com/).
2. Use a query-building library such as [Squel](https://hiddentao.com/squel/), which this library actually uses.

The choices are slim. The biggest issue with ORMs is the fact they usually work best on empty databases, 
where all data is inserted and managed by a locally-defined schema consisting of models and controllers. Query builders
are great, but can hard to swap out later on down the line, and the available API is usually attached to a particular 
language. For example, I used [Squel](https://hiddentao.com/squel/) for all my Node.js database communication, but used
 [Quill](http://getquill.io/) for all my Scala database communication. And in case you're wondering, no, the libraries 
 are nothing like each other, despite doing virtually the same thing.
 
So that's where DatQL comes in. DatQL is an abstraction *over* the abstractions, so to speak. The DatQL markup is parsed
using a publicly-available context-free grammar and can be adapted to virtually any language. While query builders can 
be replaced depending on which language the DatQL library supports, the markup remains unchanged, creating an extensible, 
open way to write SQL. Plus, DatQL at a glance is much easier to understand than SQL, especially for those who are not SQL
experts.

The Markup
----------
### Queries & Mutations
DatQL is fairly straightforward to understand. Like GraphQL, .dql files contain a collection of *documents*, which can 
be one of two types: a mutation (insertion/update) or a query. Each document definition contains a name, as well as any 
declared variable parameters it uses. For example:

```
query getBookmarksForUser($user_id) 
```

You can also call neighboring mutations or queries as well (where appropriate), such as:

```
users(id = getUserIDFromPage(102)) {
    id
}
```

### SELECT
Inside the query block, all top-level blocks are tables from which to SELECT from. Currently, only one table block 
per query is supported; however, in the future multiple may be supported. Tables also accept a list of WHICH statements
that filter the results returned. So let's start out by selecting from our `users` table, filtering by entries whose ID 
matches the user ID provided to the query:

```
query getBookmarksForUser($user_id) {
    users(id = $user_id) {
        id
    }
}
```

Like GraphQL, you can specify which fields to return inside each table block. You can alias these fields by specifying
an alias in square brackets ([]) next to the field name.

### JOIN
JOINs take on a form similar to those of fragments in GraphQL. While their fundamental philosophies differ, the syntax 
is the same. JOIN blocks begin with `...on ` and must specify a table name and `ON` clause in parentheticals. Like 
tables, JOIN blocks accept field names, and it is ***strongly advised that you alias all JOIN fields to avoid conflicts***.
So, let's wrap up our statement by joining the `users` table with the `bookmarks` table:

```
query getBookmarksForUser($user_id) {
    users(id = $user_id) {
        id
        
        ...on bookmarks(user_id = users.id) {
            name[bookmark_name]
        }
    }
}
```

API
---
Similar to Apollo's [graphql-tag](https://github.com/apollographql/graphql-tag), DatQL uses an ES2015 template literal 
tag which is supported by most recent versions of Node. Currently, DatQL supports three SQL flavors: MySQL (mysql), PostgresQL (postgres), 
and Microsoft SQL (mssql). The `dql` tag processes documents into a tree, returning a function that accepts variables, as well 
as the name of the query or mutation to execute. By default, DatQL will always execute the last defined document in a 
file. So for our above query:

```javascript
const dql = require('dql').postgres;

const getBookmarksForUser = dql`
    query getBookmarksForUser($user_id) {
        users(id = $user_id) {
            id
            
            ...on bookmarks(user_id = users.id) {
                name[bookmark_name]
            }
        }
    }
`;

/**
 * Outputs { 
 *  text: 'SELECT id, bookmarks.name AS bookmark_name FROM users INNER JOIN (SELECT bookmarks.name, bookmarks.user_id FROM bookmarks) AS bookmarks ON (bookmarks.user_id = users.id) WHERE (id = $1)',
 *  values: [ 1002 ] 
 * } 
 */
const sql = getBookmarksForUser({
    user_id: 1002
});

// Outputs SELECT id, bookmarks.name AS bookmark_name FROM users INNER JOIN (SELECT bookmarks.name, bookmarks.user_id FROM bookmarks) AS bookmarks ON (bookmarks.user_id = users.id) WHERE (id = 1002)
const sql_str = getBookmarksForUser({
    user_id: 1002
});
```

By default, DatQL outputs an object containing both the text of the query and any variables associated with it. This 
allows your database engine to sanitize any variables to prevent SQL-injection attacks. To override this behavior, 
simply pass `true` as the last parameter of the function. If your string contains multiple documents, you can
pass in the name of the entry-point document as the first argument of the function like so:

```javascript
getBookmarksForUser('getBookmarksForUser', {
    user_id: 1002
}, true);
```

Caveats
-------
As stated, this library is highly experimental. A couple things to note:

1. The library assumes any fields on the left-side of an operator in any `WHICH`/`ON` statement is a field belonging to
the table in question. As a result, they should not be prefixed by the table name. So for example, the following is correct,
assuming the `users` table has `name` field:

    ```
    ...on users(name = 'Tyler')
    ```

    The following ***will not*** work:
    
    ```
    ...on users('Tyler' = users.name)
    ```

2. DatQL is capable of detecting built-in functions, method calls, and variables in `WHICH`/`ON` statements. 
Any text that does not match one of these is susceptible to being recognized as a field name. As a result, try to keep
your selectors simple and keep fields to the left of any operator.

3. While this library is designed to be an abstraction over SQL, certain database-specific functions such as `Now()` have
not yet been abstracted and will need to be changed manually if you switch databases. Ideally, in the future DatQL will 
include its own built-in functions which will automatically be converted between databases.