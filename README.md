# Stackify
by Bryan, Joanna, Jack & Kaito @ Fullstack Academy

LIVE @ http://stackify.herokuapp.com/

![gif](https://github.com/kaitohara/stackstore/blob/master/browser/stackify.gif)

[![Stories in Ready](https://badge.waffle.io/kaitohara/stackstore.png?label=ready&title=Ready)](http://waffle.io/kaitohara/stackstore)

- [x] For its final evaluation, your project must be deployed (e.g. via Heroku)
- [x] Your README should have a link to the live site
- [x] Your live site should have a path at /github that redirects to your Github repo (e.g. stackstore.herokuapp.com/github -> github.com/davidyang/stackstore)

## Your project will be evaluated based on the following criteria:
- Code quality and adherence to best practices
- Feature completeness
- Usability of the site
- Design/visual appeal
- Schema design
- Project management and effective usage of git

## Unauthenticated Users
Similar to Amazon, your site should support browsing its products without having to create an account. All users who visit your site should be able to perform the following activities:

### View products
- [x] Refine listing by category
- [x] Search product listing
- [x] View a product's details
  - [x] Product information
  - [x] Photo(s)
  - [x] View reviews left by authenticated users

### Manage their cart
- [x] Add an item to the cart from product listing or product detail pages
- [x] Remove an item from the cart
- [ ] Edit/update quantities of items in the cart
- [ ] Log in and continue editing the cart
- [x] Refresh the page without being logged in and have the cart persist (you may use sessionStorage, localStorage, Cookies or JWT for this)

### Account Management
- [x] Create an account
- [x] Login with Facebook and/or Google

### Checkout
- [x] Purchase items from cart
- [x] Specify shipping address and email address
- [ ] Receive confirmation email
- [ ] Receive notification emails upon order shipping, then order delivery

## Authenticated Users
- [x] Logout

### Account management
- [x] View past order list
- [x] View order detail
  - [x] Current order status
  - [x] Items with quantity and subtotal
  - [x] Link to the original product detail page
  - [x] Date/time order was created

### Product reviews
- [ ] Leave a review (with text and a 5-star rating) for a product

## Admin Users
### Product management
Create and edit products with name, description, price and one or more photos
Create categories for items, each item can have multiple categories
Manage the availability of a product. If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
Add/remove categories from items
### Order management
View a list of all orders
Filter orders by status (Created, Processing, Cancelled, Completed)
Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
View details of a specific order
### User management
Promote other user accounts to have admin status
Delete a user
Trigger password reset for a user (next time they successfully log in—with their old password—they are prompted for a new one)


## Data Validations

As you work on your data models, please consider the types of data that you will receive, what you want to make required and how you will propagate those errors to the user.

### PRODUCTS

Must have title, description, price, and inventory quantity
Must belong to at least one category
The title must be unique
If there is no photo, there must be a placeholder photo used
### USERS

Users must have a valid email address
Users email must be unique
### ORDER

Orders must belong to a user OR guest session
Orders must contain line items that capture the price, current product ID and quantity
If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes
### REVIEWS

All reviews must belong to a product
All reviews must belong to a user
All reviews must be at least X characters

## Multitenancy

Add to your StackStore the ability for users to create their own mini-store (similar to eBay or Amazon). Conceptually, you will add a new user role: "seller".

A user should set up a store with: name, description, URL slug (so there store can be something like yourstackstore.com/stores/davidsstore). Store names must be unique.

A user should be able to add products to their store. These products will only belong to their store and not be generally available on the site.

A user should be able to modify their store's appearance. You may choose whether that will involve the user writing custom CSS or some user interface for arranging/styling visual components of their store.

