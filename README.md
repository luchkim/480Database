# 480Database


## Intro 

# packages
morgan: dynamic logger 
nodemon: refresh server if there is changes
ejs:
body-parser: responsible for parsing the incoming request bodies in a middleware before you handle it 
dotenv: for saving credentials. good for shared environment, allowing other to create their own env file.
axios: it makes request easy in express app
sqlite3: SQL Database 

## Project Structure

# server
it contains all the serverside resourses such as database connections 

# views
it contains all html (ejs) files to render

# router
it contains all the router for main server.js simplicity
it also takes care of any routing related requests and responses.

# public
it contains all the css, image, and trivial javascript files

# database
it contains database connections and resources




## Resources
https://en.m.wikiversity.org/wiki/Server-Side_Scripting/SQL_Databases/Node.js_(Express)
https://sqlite.org/datatype3.html
