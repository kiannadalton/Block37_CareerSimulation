# Block37_CareerSimulation
This is the backend of the Capstone project.

*Overview*
In this Career Simulation, Calliope asks you to create the back end of a review site for one of Fullstack Solutions' clients. After the back end has been completed, the client will review and provide feedback for improvement before starting the front end at a later time.

*Instructions*
In the email above, Calliope has requested that you build the back end first at the client's request. In order for you to have a full understanding of the full stack application, review the following requirements for each user experience: 

*AS A USER (NOT LOGGED IN), I SHOULD BE ABLE TO:*
Access the website via the Internet so I can browse and read reviews.
    - Get all items - findMany
    - Get all reviews - findMany
View details for a specific reviewed item (store, restaurant, product, book, etc.)
    - Get item - findUnique
I should be able to see the item’s average score or rating.
    - Get item - will need to call on all reviews with item_id
I should be able to see any relevant information about the item.
    - Get item - findUnique
    - Get reviews with item_id
    - Get comments tied to reviews with item_id
Search for specific items, so I can see their scores and read reviews about them.
    - Get all items - findMany
    - Get item - findUnique
Sign up for an account so I can have a logged-in experience.
    - Post user - create
Log in to the site if I already have an account.
    - Get user - user tokens

*AS A LOGGED-IN USER, I SHOULD BE ABLE TO:*
Write and submit a review for an item that includes:
    A written text review
    A score/rating
        - Post review - create
Only one review should be allowed per item, per user
View a list of all reviews I have written.
    - Get all reviews with user_id
Delete reviews I have written.
    - Delete review
Edit reviews I have written.
    - Put review
Change the text review.
    - Put review txt field - clarify how this is different
Modify the score/rating.
    - Put review score field
Write comments on reviews written by others.
    - Post comment
View a list of all comments I have written.
    - Get All comments with user_id
Edit and delete my comments.
    - Put comment
    - Delete comment