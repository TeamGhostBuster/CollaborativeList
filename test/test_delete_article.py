from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_delete_article(driver, wait, title):

    # find and click on the details button
    detialButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".DetailButton")))
    detialButton.click()
    time.sleep(2)

    # constant
    titleXPATH = "//span[text()='%s']"%title

    # find and click the remove button
    removeButton  = wait.until(EC.presence_of_element_located((By.NAME,"RemoveButton")))
    removeButton.click()
    time.sleep(2)

    # check if we can see the title
    try:
        driver.find_element_by_xpath(titleXPATH)
        assert False, "it's still there"
    except exceptions.NoSuchElementException:
        pass
