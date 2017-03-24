from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import sys
from test_authentication import test_authentication
from test_create_personal_list import test_create_personal_list
from test_create_group import test_create_group
from test_create_article_for_person_list import test_create_article_for_person_list
from test_archive_personal_reading_list import test_archive_personal_reading_list
from test_view_article_from_person_list import test_view_article_from_person_list
from test_comment_on_article_from_personal_list import test_comment_on_article_from_personal_list
from test_rename_list import test_rename_list
from test_partition_list import test_partition_list
from test_merge_list import test_merge_list
from test_share_list import test_share_list
from test_delete_article import test_delete_article
from test_vote_on_article_from_group_list import test_vote_on_article_from_group_list

# constants
assert len(sys.argv) == 3, "usage: python <testFile> <email> <password>"
username = sys.argv[1]
password = sys.argv[2]
url = "http://demo.vfree.org"

# Start the driver
driver = webdriver.Firefox()
# let driver wait for a maximum of 5 seconds,
# because we are using ajax, some element won't show up until we got response
wait = WebDriverWait(driver, 5)

# test case 1
test_authentication(url, username, password, driver, wait)
print("passed test case 1!")

# test case 2
testListName = "new list"
test_create_personal_list(driver, wait, testListName)
print("passed test case 2!")

# test case 3
testGroupName = "new Group"
test_create_group(driver,wait, testGroupName)
print("passed test case 3!")

# test case 4
test_archive_personal_reading_list(driver, wait, testListName)
print("passed test case 4!")

# test case 5
testArticleName = "new personal article"
testArticleDescription = "this is a description"
testArticleURL = "http://aURL.com"
testArticleTag = "Test Tag"
test_create_personal_list(driver, wait, "new list 2")
test_create_article_for_person_list(driver,wait,testArticleName, testArticleDescription, testArticleURL, testArticleTag)
print("passed test case 5!")

# test case 6
test_view_article_from_person_list(driver, wait, testArticleName, testArticleDescription, testArticleURL, testArticleTag)
print("passed test case 6!")

# test case 7
testComment = "this is a comment"
test_comment_on_article_from_personal_list(driver, wait, testComment)
print("passed test case 7!")

# test case 8
testNewListName = "A Better Name"
test_rename_list(driver, wait, testListName, testNewListName)
print("passed test case 8!")

# test case 9
test_partition_list(driver, wait, testNewListName, testListName)
print("passed test case 9!")

# test case 10
test_merge_list(driver, wait, testGroupName)
print("passed test case 10!")

# test case 11
test_share_list(driver, wait, testNewListName, testGroupName)
print("passed test case 11!")
# test case 12 (it's the same procedure)
test_create_personal_list(driver, wait, testListName)
print("passed test case 12!")

# test case 13
testArticleName2 = "new personal article2"
testArticleDescription2 = "this is a description2"
testArticleURL2 = "http://aURL2.com"
testArticleTag2 = "Test Tag2"
test_create_article_for_person_list(driver,wait,testArticleName2, testArticleDescription2, testArticleURL2, testArticleTag2)
print("passed test case 13!")

# test case 14
test_delete_article(driver, wait, testArticleName)
print("passed test case 14")

# test case 15
test_vote_on_article_from_group_list(driver, wait)
print("passed test case 15!")