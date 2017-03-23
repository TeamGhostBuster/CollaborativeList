from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_share_list(driver, wait, shareList, groupName):
    # constant
    listXPATH = "//h1[text()='%s']"%shareList
    groupXPATH = "//div[text()='%s']" % groupName

    # put method is not allowed if not refresh????????
    driver.refresh()
    # click on the list more button
    openButton = wait.until(EC.presence_of_element_located((By.NAME, "ListActionsButton")))
    openButton.click()
    time.sleep(2)

    # find and click the share list button
    partitionButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".ShareToGroup")))
    partitionButton.click()
    time.sleep(2)

    # choose a group
    groupCheck = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"label.ListItem")))
    groupCheck.click()

    # click on submit button
    submitButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"button.Submit")))
    submitButton.click()
    time.sleep(2)

    # open sidebar
    openDrawerButton = wait.until(EC.presence_of_element_located((By.NAME, "drawerButton")))
    openDrawerButton.click()
    time.sleep(2)

    # go to the group page
    groupButton = wait.until(EC.presence_of_element_located((By.XPATH, groupXPATH)))
    groupButton.click()
    time.sleep(3)

    # check if the list exists
    try:
        driver.find_element_by_xpath(listXPATH)
    except exceptions.NoSuchElementException:
        assert False, "old is still there"
