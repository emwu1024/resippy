# Resippy Repository

This project is a repository for recipes I have previously made so I can remember that these recipes exist for longer than a month at a time :)

## Stack + Reference

- NPM
- Vite
- React
- Typescript
- Node
- Express
- Postgresql
- Colour Scheme: https://coolors.co/2c462c-606c38-283618-0f140a-2b0d06-3d1308-7d4017-bc6c25-dda15e-f3cea4
  - Colour Scheme should be inspired by: Greens (banana leaf, matcha, grass); Golds (Wood, Gold, Aged Bamboo); Reds (Red Bean, Dates, Cinnabar Stamps)
- Hero Image: https://unsplash.com/photos/sliced-apple-and-red-strawberries-on-brown-wooden-chopping-board-LgnE31R9PGc
- Bookmark CSS: https://codepen.io/Magns/pen/QpbjEe

## Running The Application

### Frontend

1. Navigate to the 'client' folder.
2. Run `npm run dev`
3. Frontend URLs:
4. Homepage: http://localhost:5173
5. Index: http://localhost:5173/recipes
6. Create Recipe: http://localhost:5173/recipes/create

### Backend

1. Navigate to the 'server' folder.
2. Run `npm run dev`
3. Check Backend by navigating to this URL: http://localhost:8000/recipes

## Findings Log

1. If I want to store high quality photos's on MongoDB I will need to use something called GridFS: https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/
2. Was encountering issues running the backend. Fixed by whitelisting IP address of new working location 🤦‍♀️
3. Typescript doesn't like some of the things Javascript accepts e.g. react-icons doesn't like the use of 'className' instead of attributes like 'color' etc.
4. Tiptap is working as expected, some fonts do not have italics.

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
10. Ah no, WYSIWYG might be useful for a mobile format of the data, but the web version will handle things differently, images will go on one side and instructions will go on the other, this might be difficult to render. This will require a smarter way of saving the data for use in different formats or duplicating user input of data which isnt ideal.
