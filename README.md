# fullstack react express mongo recipes (version dos in github)

## Tracking client on port 3000 and backend on port 3334

## created on 5.15.2022 on betastudent account

### commands used :

1. on github: create new repository, add title, add description, left default value (public, no README, etc)
1. on betastudent: 
  1. created key pair: ssh-keygen -t ed25519 -C "email@email"
  1. cat pub key and copy into github : https://github.com/settings/keys
  1. //start the ssh-agent in the background; $ eval "$(ssh-agent -s)" > Agent pid 59566
  1. ssh-add ~/.ssh/myprivatekey; if keys unknown type ssh-add dash L to see them 
  1. once agent is up and with your private key do push
  1. first set remote: 
  1. git remote add origin git@github.com:nelsondio/full-react-ant-express-mongo-dos.git
  1. git branch -M main
  1. git push origin main
  1. to change url: git remote set-url origin <newrepo dot git>
  1. if the agent is not set, push is not allowed, no matter from what account or computer is made
  1. Originally I thought the email was not recognized. But even when the email was correct the push was not allowed
  1. I had to set the agent again. For now it is working to push to remote/origin from nelsonlopezjimenez email betastudent

1. on studentgama (at wolfsonuser52nv53) I started a project similar to betastudent but for some reason the react app was commited only as a file.
1. Then repo Fullstack-react-express-mongo-recipes.git was deleted.
1. Tunnel to mongo server:
1.  15  ssh -N -L 27017:localhost:27017 -i ~/.ssh/betastudent_id_2_mongoserver student2@ec2-34-216-78-89.us-west-2.compute.amazonaws.com
1.  16  ssh -N -L 27017:localhost:27017 -i ~/.ssh/betastudent_id_2_mongoserver student2@ec2-34-216-78-89.us-west-2.compute.amazonaws.com
1. at /c/users/Public/2022/fullstack-react-express-mongo-recipes
1. mkdir express-mongo-backend and npx create-react-app react-ant-client-frontend
1. cd express-mongo-backend
1. npm init, npm install express, npm install @babel/node @babel/core @babel/preset-env nodemon --save-dev; 
1. express.../mkdir src, touch src/app.js, edit package.json scripts 
1. "start": "nodemon --exec ./node_modules/.bin/babel-node ./src/app.js",
1. touch .babelrc
1. add to .babelrc : {
    "presets": [
        "@babel/preset-env"
    ]
}
1. edit expres.../src/app.js to create "Hello world!!!" message
1. react-client..../package.json added :
1. "proxy": "http://localhost:3334",
1. npm install antd
  
