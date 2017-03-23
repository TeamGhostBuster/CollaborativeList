# Testing

## Test Cases (Backend)

### Strategy
For the backend, we will have another instance of software running in a isolated docker container isolated with our production environment for unit testing. The unit test runs with pytest, a Python test framework, and it can run automatically. Since the backend essentially is providing RESTful API to the client, the way we test the API is by send HTTP request to our testing server to verify responses' status code and content. By doing so, we can easily implement new feature, refactor code, or make any other changes, then test it with existing test cases.

### Usage
The test cases is located under the `tests` folder, replace the access token with your own one.

`$ make test`

### Sample Console Output
```
==================================================== test session starts ====================================================
platform linux -- Python 3.5.2, pytest-3.0.6, py-1.4.32, pluggy-0.4.0
rootdir: /home/app, inifile:
plugins: ordering-0.4
collected 6 items

test/test_list.py .
test/test_article.py .
test/test_list.py ....

================================================= 6 passed in 0.32 seconds ==================================================
```  

### Test Case 1
Item          | Detail
:-----------: | :----------------
Name          | `test_create_user_list`
Purpose       | Verify that user would be able to create a reading list.
Reference     | [US 2.1](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create)

### Test Case 2
Item          | Detail
:-----------: | :----------------
Name          | `test_get_user_all_lists`
Purpose       | Verify that user would be able to get his reading lists.
Reference     | [US 2.1](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create)

### Test Case 3
Item          | Detail
:-----------: | :----------------
Name          | `test_create_article_for_user`
Purpose       | Verify that user would be able to create an article under a personal list.
Reference     | [US 2.5](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create) [US 2.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create) [US 3.1](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-edit)

### Test Case 4
Item          | Detail
:-----------: | :----------------
Name          | `test_delete_article_from_list`
Purpose       | Verify that user would be able to delete an article under a personal list.
Reference     | [US 3.8](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-edit)

### Test Case 5
Item          | Detail
:-----------: | :----------------
Name          | `test_archive_user_list`
Purpose       | Verify that user would be able to archive a personal list.
Reference     | [US 3.9](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-edit)

### Test Case 6
Item          | Detail
:-----------: | :----------------
Name          | `test_retrieve_user_list`
Purpose       | Verify that user would be able to retrieve a archived personal list.
Reference     | [US 3.10](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-edit)

### Test Case 7
Item          | Detail
:-----------: | :----------------
Name          | `test_post_comment_to_article`
Purpose       | Verify that user can post comment to a article
Reference     | [US 3.2](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-edit)

### Test Case 8
Item          | Detail
:-----------: | :----------------
Name          | `test_create_group`
Purpose       | Verify that user can create a reading group
Reference     | [US 2.2](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create)

### Test Case 9
Item          | Detail
:-----------: | :----------------
Name          | `test_create_group_list`
Purpose       | Verify that user can create a list in a group
Reference     | [US 2.4](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create)

### Test Case 10
Item          | Detail
:-----------: | :----------------
Name          | `test_create_article_for_group`
Purpose       | Verify that user can create article in a group list
Reference     | [US 2.5](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-create)

### Test Case 11
Item          | Detail
:-----------: | :----------------
Name          | `test_upvote_article`
Purpose       | Verify that user can up vote article
Reference     | [US 4.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#4-share)

### Test Case 12
Item          | Detail
:-----------: | :----------------
Name          | `test_downvote_article`
Purpose       | Verify that user can down vote article
Reference     | [US 4.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#4-share)

### Test Case 13
Item          | Detail
:-----------: | :----------------
Name          | `test_user_cannot_vote_twice`
Purpose       | Verify that user can vote twice
Reference     | [US 4.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#4-share)

## Test Cases (Frontend)

### Strategy
For the frontend, we will run a local instance of the software and bypass the google login by providing it with a mock server. The automation test is using Selenium with firefox, written in python.We will test the application by checking if it is sending the right HTTP requests and displaying the right output based on the HTTP response from backend.

### Usage
The frontend automation test is going to be implemented in sprint 4.

### Test Case 1
Item          | Detail
:-----------: | :----------------
Name          | `test_authentication`
Purpose       | Verify that the login button is clear and clickable
Reference     | [US 1](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#1-Authentication)

### Test Case 2
Item          | Detail
:-----------: | :----------------
Name          | `test_create_personal_reading_list`
Purpose       | Verify that click on create list button will open a dialog
Purpose       | Verify that click on cancel button will close the dialog
Purpose       | Verify that click on submit without required field won't close the dialog
Purpose       | Verify that click on submit with required field will close the dialog and a new list with correct name will show up
Reference     |[US 2.1](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)

### Test Case 3
Item          | Detail
:-----------: | :----------------
Name          | `test_create_group`
Purpose       | Verify that click on create group button will open a dialog
Purpose       | Verify that click on cancel button will close the dialog
Purpose       | Verify that click on submit without required field won't close the dialog
Purpose       | Verify that click on submit with required field will close the dialog and a new group with correct name will show up
Reference     |[US 2.2](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)


### Test Case 4
Item          | Detail
:-----------: | :----------------
Name          | `test_archive_personal_reading_list`
Purpose       | Verify that archive an empty personal reading list, it will disapear from the page
Purpose       | Verify that archive an non-empty personal reading list, it will disapear from the page
Reference     |[US 3.9](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)


### Test Case 5
Item          | Detail
:-----------: | :----------------
Name          | `test_create_article_for_person_list`
Purpose       | Verify that click on add article button will open a dialog
Purpose       | Verify that click on cancel button will close the dialog
Purpose       | Verify that click on submit without required field won't close the dialog
Purpose       | Verify that click on submit with required field will close the dialog and a new article with correct name will show up
Purpose       | Verify that you can add tag
Reference     |[US 2.5](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create) [US 2.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)

### Test Case 8
Item          | Detail
:-----------: | :----------------
Name          | `test_view_article_from_person_list`
Purpose       | Verify that click on details button, a dialog with correct name, descriptipn, tag and url will pop up
Purpose       | Verify that click on cancel button will close the dialog
Reference     |[US 2.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)

### Test Case 9
Item          | Detail
:-----------: | :----------------
Name          | `test_comment_on_article_from_personal_list`
Purpose       | Verify that the comment with right conetent shows up after click on submit
Purpose       | Verify that the comment does not show up after click on cancel
Reference     |[US 3.2](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)

### Test Case 
Item          | Detail
:-----------: | :----------------
Name          | `test_rename_list`
Purpose       | Verify that the article name changed after submit
Reference     |[US 3.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)

### Test Case 
Item          | Detail
:-----------: | :----------------
Name          | `test_partition_list`
Purpose       | Verify that the there's a new list after partition
Reference     |[US 3.5](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)

### Test Case 
Item          | Detail
:-----------: | :----------------
Name          | `test_merge_list`
Purpose       | Verify that the there's a new list after partition
Reference     |[US 3.5](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)


### Test Case 10
Item          | Detail
:-----------: | :----------------
Name          | `test_delete_article_for_person_list`
Purpose       | Verify that click on remove button will close the details dialog
Purpose       | Verify that the article is not shown in the list
Reference     |[US 3.8](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)



### Test Case 11
Item          | Detail
:-----------: | :----------------
Name          | `test_create_group_reading_list`
Purpose       | Verify that click on create list button will open a dialog
Purpose       | Verify that click on cancel button will close the dialog
Purpose       | Verify that click on submit without required field won't close the dialog
Purpose       | Verify that click on submit with required field will close the dialog and a new list with correct name will show up 
Reference     |[US 2.4](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)


### Test Case 12
Item          | Detail
:-----------: | :----------------
Name          | `test_archive_group_reading_list`
Purpose       | Verify that archive an empty group reading list, it will disapear from the page
Purpose       | Verify that archive an non-empty group reading list, it will disapear from the page
Reference     |[US 3.9](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)

### Test Case 13
Item          | Detail
:-----------: | :----------------
Name          | `test_create_article_for_group_list`
Purpose       | Verify that click on add article button will open a dialog
Purpose       | Verify that click on cancel button will close the dialog
Purpose       | Verify that click on submit without required field won't close the dialog
Purpose       | Verify that click on submit with required field will close the dialog and a new article with correct name and 0 vote count will show up
Reference     |[US 2.5](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)

### Test Case 14
Item          | Detail
:-----------: | :----------------
Name          | `test_view_article_from_group_list`
Purpose       | Verify that click on details button, a dialog with correct name, descriptipn, tag and url will pop up
              | Verify that click on cancel button will close the dialog
Reference     |[US 2.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#2-Create)

### Test Case 15
Item          | Detail
:-----------: | :----------------
Name          | `test_comment_on_article_from_group_list`
Purpose       | Verify that the comment with right conetent shows up after click on submit
Purpose       | Verify that the comment does not show up after click on cancel
Reference     |[US 3.2](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)

### Test Case 16
Item          | Detail
:-----------: | :----------------
Name          | `test_delete_article_for_group_list`
Purpose       | Verify that click on remove button will close the details dialog
              | Verify that the article is not shown in the list
Reference     |[US 3.8](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#3-Edit)

### Test Case 17
Item          | Detail
:-----------: | :----------------
Name          | `test_vote_on_article_from_group_list`
Purpose       | Verify that the vote count goes up after upvote
Purpose       | Verify that the vote count won't go up after upvote for a second time
Purpose       | Verify that the vote count goes down after downvote
Purpose       | Verify that the vote count won't go down after downvote for a second time
Purpose       | Verify that the vote count won't go down if the count is already 0
Purpose       | Verify that you can downvote after a upvote
Purpose       | Verify that you can upvote after a downvote
Reference     |[US 4.3](https://teamghostbuster.github.io/CollaborativeList/requirement-document/user-stories/#4-Share)


## Note
 - More tests will be added upon next release.

