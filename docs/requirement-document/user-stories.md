# User Story

## 1. Authentication
- 1.1 As a user, I can login through Oauth2 provider (Google/Facebook/Github).
    * Login button is recognizable.
    * Cliking the login button will direct user to the provider's page for authentication

## 2. Create
- 2.1 As a user, I can create a reading list.
    * The reading list is displayed.
    * Creating a list will lead to a form filling in the necessary information about the list.
    * When the action is done, there should be a list object on the server.
- 2.2 As a user, I can create a reading group.
    * The group is displayed.
    * When the action is done, there should be a new group object on the server.
- 2.3 As a user, I can add metadata tags to each article.
    * The tag is displayed.
    * The tag is associated with the article
- 2.4 As a user, I can create reading lists for the group.
    * The list is displayed under the group.

## 3. Edit
- 3.1 As a user, I can add description to each article.
    * I can see the description.
    * It is saved to the database.
- 3.2 As a user, I can comment on each article.
    * I can see the comment.
    * It is saved to the database.
- 3.3 As a user, I can rename lists.
    * The list name is changed.
    * The new list name is displayed.
- 3.4 As a user, I can merge lists.
    * The new list is displayed
    * Previous lists are gone.
- 3.5 As a user, I can partition lists.
    * A new list is displayed.
    * Previous list is splited into two.
- 3.6 As a user, I can copy articles from one list to another.
    * A duplicated article is displayed in another list.
- 3.7 As a user, I can move articles from one list to another.
    * The article is displyed in another list.
    * The article is no longer in the previous list.
- 3.8 As a user, I can delete articles from lists.
    * The article is not in the list anymore.
- 3.9 As a user, I can archive lists.
    * The list will not be displayed.
    * User may retrive it.
- 3.10 As a user, I can retrieve archived lists.
    * The list is displayed.

## 4. Share
- 4.1 As a user, I can grant/revoke read/write access of reading list to others.
    * Others will able/unable to read/write my list.
- 4.2 As a user, I can share my reading list to a group.
    * The reading list will show up in the group's reading list.
    * The group has ownership to the new list.
- 4.3 As a user, I can upvote/downvote each article once.
    * It will indicate that the vote has changed.
- 4.4 As a user, I can hide my comments on articles.
    * Other user cannot see my comment.

## 5. Moderator
- 5.1 As a moderator, I can invite people to join my group.
    * The group will show up in the user's group list.
- 5.2 As a moderator, I can block people in my group.
    * The user who got blocked will no longer able to take any action in the group.
- 5.3 As a moderator, I can kick out people from my group.
    * The user who got kicked will lose access to the group.
- 5.4 As a moderator, I can delete an article and keep people from reposting it.
    * The article I deleted cannot be posted by other user.
- 5.5 As a moderator, I can set a limit on how many suggestions each person can submit
    * User cannot suggest amount of articles above the limit.
    * When user excess the limit, the user will receive a alert.
- 5.6 As a moderator, I can make someone else in the group the moderator.
    * The user will have ownership of the group.

## 6. Search/Filter
- 6.1 As a user, I can search article by tags.
    * I can see articles that match.
    * I can add one of them to my own list.
- 6.2 As a user, I can search article by name and description.
    * I can see articles that match.
    * I can add one of them to my own list.
- 6.3 As a user, I can filter article by tags.
    * I can see articles that match.
    * I can add one of them to my own list.
- 6.4 As a user, I can filter article by name and description.
    * I can see articles that match.
    * I can add one of them to my own list.
- 6.5 As a user, I can search a group by group name.
    * I can see articles that match.
    * I can add one of them to my own list.

## 7. Notification
- 7.1 As a user, I can receive voting notification whenever it changes.
    * I can see a alert on my browser.
- 7.2 As a user, I can receive notification when the voting end.
    * I can see a alert on my browser.
