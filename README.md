# Resippy Repository

This project is a repository for recipes I have previously made so I can remember that these recipes exist for longer than a month at a time :)

## Stack + Reference

- NPM
- Vite
- React
- Typescript
- Node
- Express
- MongoDB
- Multer
- Sharp
- Colour Scheme: https://coolors.co/2c462c-606c38-283618-0f140a-2b0d06-3d1308-7d4017-bc6c25-dda15e-f3cea4
  - Colour Scheme should be inspired by: Greens (banana leaf, matcha, grass); Golds (Wood, Gold, Aged Bamboo); Reds (Red Bean, Dates, Cinnabar Stamps)
- Hero Image: https://unsplash.com/photos/sliced-apple-and-red-strawberries-on-brown-wooden-chopping-board-LgnE31R9PGc
- Bookmark CSS: https://codepen.io/Magns/pen/QpbjEe

## Running The Application

### Frontend

1. If running project from scratch:
   1. Create .npmrc file from .npmrc.template with your tiptap auth token
   2. Create .env file from .env.template with your auth0 domain and clientID
   3. Run `npm install` in client folder
2. Navigate to the 'client' folder.
3. Run `npm run dev`
4. Frontend URLs:
   1. Homepage: http://localhost:5173
   2. Index: http://localhost:5173/recipes
   3. Create Recipe: http://localhost:5173/recipes/create

### Backend

1. If running project from scratch:
   1. Create config.js file from config.js.template with your mongoDB information
   2. Run `npm install` in server folder
2. Navigate to the 'server' folder.
3. Run `npm run dev`
4. Check Backend by navigating to this URL: http://localhost:8000/recipes

#### Mongo Backups

The project runs on mongoDB and this iteration uses the M0 cluster which can't take advantage of mongoDBs autobackup functionality.
The backupdb.sh script attached just needs to be modified with your details and moved to whatever directory you want

1. Create backupdb.sh from backupdb.sh.template file and add your connection string and absolute paths to work
2. Ensure the script has permission to run - `chmod +x backupdb.sh`
3. (optional) Set up a cron job so backups are made incrementally and automatically
   1. IF setting up a cron job and on mac you will likely need to move the the script to you /Users/username folder
   2. Open terminal and type `crontab -e`
   3. Enter your cron job - I used this `00 18 * * 0,3 "/Users/username/backupdb.sh" > "/Users/username/your/project/path/here/cronjob.log" 2>1`
   4. Considerations: If the device you are running the cron job is off / asleep the cron job will not run.
4. Should you need to rollback to a previous backup run this command: `mongorestore <YOUR_CONNECTION_STRING> backups/<DATED_FOLDER>\`

## Findings Log

1. If I want to store high quality photos's on MongoDB I will need to use something called GridFS: https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/
2. Was encountering issues running the backend. Fixed by whitelisting IP address of new working location 🤦‍♀️
3. Typescript doesn't like some of the things Javascript accepts e.g. react-icons doesn't like the use of 'className' instead of attributes like 'color' etc.
4. Tiptap is working as expected, some fonts do not have italics.
5. Good website for creating css animations: https://webcode.tools/css-generator/keyframe-animation
6. Values in .env get injected back into the code in production env so additional security measured need to be considered: 8:00 - https://www.youtube.com/watch?v=pAzqscDx580
7. Wow really cool website about folding CSS effect! https://www.joshwcomeau.com/react/folding-the-dom/
8. So apple TCC policy means cron jobs and launchd jobs can't run scripts that are in protected folders (Desktop, Documents, Downloads) and providing full disk access doesn't seem like the wisest security decision so the suggestion is to move the script into another folder where TCC doesn't apply: https://stackoverflow.com/questions/64419734/macos-catalina-launchd-cant-open-input-file-error

## Work Log

1. Currently implementing the frontend + backend from this tutorial: https://medium.com/@arpitha.rajeev37/mern-stack-refresher-crud-operations-for-a-book-store-15ff826636e9
2. Currently figuring out how to make the input of arrays smoother
3. Currently working through this repo for help setting up the backend: https://github.com/mohammad-taheri1/Book-Store-MERN-Stack/blob/main/frontend/src/pages/EditBook.jsx
4. Currently coding Navbar following this tutorial: https://blog.logrocket.com/create-responsive-navbar-react-css/
5. Adding text and image animations to the navbar using these: https://tahazsh.com/blog/text-fill-animation + https://webdesign.tutsplus.com/css-hover-effects-techniques-for-creating-a-text-wipe-fill--cms-34137t#toc-4i7s-css-text-effect
6. Adding responsiveness to the navbar using this: https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci
7. Navbar configured and done! Now currently working on implementing a WYSIWYG editor as it might be easier to layout recipe and steps like that. Currently researching the different WYSIWYG Editors for React, will probs go with TipTap and hope for the best.
8. Researching extensions from TipTap: https://tiptap.dev/docs/editor/extensions: File Handler, Image, Youtube
9. Currently following this tiptap tutorial: https://www.youtube.com/watch?v=JFzH4bDEUPo&t=232s
10. WYSIWYG might be useful for a mobile format of the data, but the web version will handle things differently, images will go on one side and instructions will go on the other, this might be difficult to render. This will require a smarter way of saving the data for use in different formats or duplicating user input of data which isnt ideal.
11. Connecting TipTap to the backend worked! Now working on creating some new components for the create recipe page such as tabs following these resources:
    1. GeeksForGeeks tabs: https://www.geeksforgeeks.org/how-to-create-tabs-in-reactjs/
    2. CSSTricks: https://css-tricks.com/tabs-its-complicated/
12. Created a 'CreateRecipeForm' component and separated into tabs, next will be working on improving the styling and then adding a toggle button component to allow the user to decide between input forms to display
13. Found a good resource for creating animations: https://webcode.tools/css-generator/keyframe-animation
14. Following this tutorial for creating a toggle button: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch
15. Learnt how to use interface for prop type declaration: https://www.reddit.com/r/reactjs/comments/wjq51d/is_reactfc_not_recommended_what_are_other/ AND https://medium.com/@jeffbutsch/typescript-interface-functions-c691a108e3f1
16. Researched image storage types, ended up wanting to use Amazon S3 but was concerned about surprise billing horror stories and opted for local storage for now.
17. Currently following this multer MERN tutorial: https://www.youtube.com/watch?v=srPXMt1Q0nY - really brilliantly explained
    1. Tiptap drag and drop: https://www.codemzy.com/blog/tiptap-drag-drop-image
    2. Sharp + Multer: https://www.codemzy.com/blog/sharp-with-multer-reduce-image-sizes
18. Will use server storage + multer + sharp for now for MVP, on the backlog will add looking into implementing S3
19. Tried multer implementation on separate branch and got it working but realised tiptap takes images in as base64 so it's easier to keep the img embedded in the HTML string instead of decoding the base64 img -> saving locally -> putting the image back
20. Today: work on input validation and errors with backend saving
21. Followed this tutorial to get be able to upload images for standardised format: https://www.youtube.com/watch?v=pfxd7L1kzio
22. Created an MVP Plan, currently finalising UI on Create Recipes Page
23. Buttons: not for MVP but will be looking into the handdrawn button design for the cookbook style here: https://css-tricks.com/a-complete-guide-to-links-and-buttons/
24. 11.08.24: Working on Auth + Auth using Auth0:
    1. https://www.youtube.com/watch?v=pAzqscDx580
    2. https://auth0.com/docs
25. Making a component to lightly hide signin button
    1. https://www.geeksforgeeks.org/how-to-create-border-animation-using-css/
    2. https://codepen.io/lomojean/pen/XWNNyx
    3. https://www.joshwcomeau.com/react/folding-the-dom/#our-mvp-5
26. Looked into RBAC amd there was a useful example here:
    1. https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-role-based-access-control/spa/react-typescript/express-javascript
    2. https://community.auth0.com/t/how-to-integrate-authentication-in-mern-app-using-auth0/104582/2
27. Due to time limitations RBAC implementation is in the backlog and deletion will only be available directly through mongodb - authentication will proceed as expected
28. Fixed refresh login persistence issue with solutions here: https://stackoverflow.com/questions/63537913/auth0-does-not-persist-login-on-page-refresh-for-email-password
29. 26.08.24: Looked into version control and backups available with mongodb, created a script which runs mongodump for backups and implemented a cron job that runs twice a week

## Back Log

1. Editor:
   1. Add picture button to editor
   2. Add drag and drop of images
   3. Make rich text easier to use
2. Atlas:
   1. Look into how to make map visualisations
   2. Look into a tagging system / possible solutions for categorising recipes
3. Create Recipes Page:
   1. Preview Section
4. Recipes:
   1. Add toggle for displayRecipe - to check if it is ready to be published
   2. Editors can see all recipe views
   3. Users can only see recipes that are published
5. Auth:
   1. RBAC using the example
