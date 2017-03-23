from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_rename_list(driver, wait, oldname, newname):
    # constant
    oldListXPATH = "//h1[text()='%s']"%oldname
    newListXPATH = "//h1[text()='%s']"%newname

    # put method is not allowed if not refresh????????
    driver.refresh()
    # click on the list more button
    openButton = wait.until(EC.presence_of_element_located((By.NAME, "ListActionsButton")))
    # close the sidebar
    openButton.click()
    # openButton.click()
    time.sleep(2)

    # find and click the rename list button
    renameButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".Rename")))
    renameButton.click()
    time.sleep(2)

    # write the name
    inputRename = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"textarea#RenameInput")))
    inputRename.send_keys(newname)

    # click on submit button
    submitButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"button.Submit")))
    submitButton.click()
    time.sleep(2)

    # check if the old list exists
    try:
        driver.find_element_by_xpath(oldListXPATH)
        assert False, "it's not renamed"
    except exceptions.NoSuchElementException:
        pass

    # check if the new list exists
    try:
        driver.find_element_by_xpath(newListXPATH)
    except exceptions.NoSuchElementException:
        assert False, "it's not renamed"