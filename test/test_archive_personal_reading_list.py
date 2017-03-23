from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_archive_personal_reading_list(driver, wait, name):
    # constant
    listXPATH = "//h1[text()='%s']"%name


    # click on the list more button
    openButton = wait.until(EC.presence_of_element_located((By.NAME, "ListActionsButton")))
    # close the sidebar
    openButton.click()
    openButton.click()
    time.sleep(2)

    # find and click the achieve list button
    archiveButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".Archive")))
    archiveButton.click()
    time.sleep(2)

    # check if the list is archived
    try:
        driver.find_element_by_xpath(listXPATH)
        assert False, "it's not closed"
    except exceptions.NoSuchElementException:
        pass



