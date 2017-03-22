from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import sys
from test_authentication import test_authentication
from test_create_personal_list import test_create_personal_list
from test_create_group import test_create_group

# constants
assert len(sys.argv) == 3, "usage: python <testFile> <email> <password>"
username = sys.argv[1]
password = sys.argv[2]
url = "http://local.vfree.org:5000"

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