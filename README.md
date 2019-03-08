# DressShop
My React project in on topic dress shop. Users can sell their dress and buy dress for other users, 
respectively this will lead to increase or descrese its money. 
When users register successful, he/she automatic receive 10lv, because my site is friendly with new users.
If some of users make something bad, like post hate comments, admins have choise to block him.
When user is bloked, he/she can`t create comment, like or create dress.

## Functionality:
### Unauthenticated users can:
- Login
- Register
- View home page with all products except bought and in the user carts
- View products by category, sort and search them by name
- View details of product and its comments

### Authenticated users can:
- All functionality like unauthenticated users expect login and register
- Create new dress if is not blocked
- Edit his own dress
- Remove his own dress
- Create comment for dress if is not blocked
- Remove his own comments
- Like dress if is not blocked
- Dislike dress if is not blocked
- View his own page with section for bought dress, sold dress, comments
- Add items to the cart if is not a creator
- Remove items from his cart
- Checkout the cart if he/she has enough money
- Logout

### Admins can:
- All functionality like authenticated users expect
- Create category for new dress
- Create, edit, remove all dress
- View page with all users
- Block and unblock users
- View all users profile

## Tools:
1. Express
2. MongoDB
3. React
4. Redux
5. Redux-thunk
6. React-toastify
7. Scss
8. Css grid