from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_create_personal_list(driver, wait, name):

    # find and click the create list button
    createButton = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "createListButton")))
    createButton.click()
    # check if a dialog shows up
    assert len(wait.until(EC.presence_of_all_elements_located((By.XPATH,"//h3[text()='Create List']")))) > 0

    # find and click the cancel button
    cancel = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.Cancel")))
    cancel.click()
    time.sleep(2)
    # check if the dialog is closed
    try:
        driver.find_element_by_xpath("//h3[text()='Create List']")
        assert False, "it's not closed"
    except exceptions.NoSuchElementException:
        pass

    # find and click on the submit button
    createButton.click()
    submit = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.Submit")))
    submit.click()
    # check if the dialog is closed
    time.sleep(2)
    try:
        driver.find_element_by_xpath("//h3[text()='Create List']")
    except exceptions.NoSuchElementException:
        assert False, "it's closed"

    # find and write the input field then submit
    input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#ListNameInput")))
    input.send_keys(name)
    submit.click()
    time.sleep(2)
    # check if the dialog is not closed
    try:
        driver.find_element_by_xpath("//h3[text()='Create List']")
        assert False, "it's not closed"
    except exceptions.NoSuchElementException:
        pass
    # check if the a list with the target name shows up
    assert len(wait.until(EC.presence_of_all_elements_located((By.XPATH, "//h1[text()='%s']"%name )))) > 0

