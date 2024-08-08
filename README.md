# Block37_CareerSimulation
This is the backend of the Capstone project.

*Overview*
In this Career Simulation, Calliope asks you to create the back end of a review site for one of Fullstack Solutions' clients. After the back end has been completed, the client will review and provide feedback for improvement before starting the front end at a later time.

*Instructions*
In the email above, Calliope has requested that you build the back end first at the client's request. In order for you to have a full understanding of the full stack application, review the following requirements for each user experience: 

*AS A USER (NOT LOGGED IN), I SHOULD BE ABLE TO:*
Access the website via the Internet so I can browse and read reviews.
    - Get all items - findMany - api/items
    - Get all reviews - findMany api/reviews/
View details for a specific reviewed item (store, restaurant, product, book, etc.)
    - Get item - findUnique - api/item/id
I should be able to see the item’s average score or rating.
    - Get item - will need to call on all reviews with item_id - api/item/id
I should be able to see any relevant information about the item.
    - Get item - findUnique
    - Get reviews with item_id
Search for specific items, so I can see their scores and read reviews about them.
    - Get  items - findMany api/items/name
Sign up for an account so I can have a logged-in experience.
    - Post user - create - api/auth/register
Log in to the site if I already have an account.
    - Get user - user tokens - api/auth/login

*AS A LOGGED-IN USER, I SHOULD BE ABLE TO:*

Write and submit a review for an item that includes:
    A written text review
    A score/rating
        - Post review - create - api/reviews/
Only one review should be allowed per item, per user
View a list of all reviews I have written.
    - Get all reviews with user_id api/reviews/:user_id
Delete reviews I have written.
    - Delete review api/reviews/:id
Edit reviews I have written.
Change the text review.
Modify the score/rating.
    - Put review api/reviews/:id
Write comments on reviews written by others.
    - Post comment - api/comments/:item_id
View a list of all comments I have written.
    - Get All comments with user_id - api/comments/:user_id
Edit and delete my comments.
    - Put comment - api/comments/:id
    - Delete comment api/comments/:id