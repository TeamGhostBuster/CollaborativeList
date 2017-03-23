from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_merge_list(driver, wait, oldname):
    # constant
    oldListXPATH = "//h1[text()='%s']"%oldname

    # put method is not allowed if not refresh????????
    driver.refresh()
    # click on the list more button
    openButton = wait.until(EC.presence_of_element_located((By.NAME, "ListActionsButton")))
    openButton.click()
    time.sleep(2)

    # find and click the merge list button
    partitionButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".MergeWith")))
    partitionButton.click()
    time.sleep(2)

    # choose an article
    articleCheck = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.ListItem")))
    articleCheck.click()

    # click on submit button
    submitButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"button.Submit")))
    submitButton.click()
    time.sleep(2)

    # check if the old list exists
    try:
        driver.find_element_by_xpath(oldListXPATH)
        assert False, "old is still there"
    except exceptions.NoSuchElementException:
        pass
