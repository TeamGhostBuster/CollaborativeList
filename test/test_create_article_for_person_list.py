from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_create_article_for_person_list(driver, wait, name, description, URL, tag):
    # constant
    dialogTitleXPATH = "//h3[text()='Create Article']"


    # find and click the create article button
    createButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".AddArticle")))
    createButton.click()
    # check if a dialog shows up
    assert len(wait.until(EC.presence_of_all_elements_located((By.XPATH, dialogTitleXPATH)))) > 0

    # find and click the cancel button
    cancel = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.Cancel")))
    cancel.click()
    time.sleep(2)
    # check if the dialog is closed
    try:
        driver.find_element_by_xpath(dialogTitleXPATH)
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
        driver.find_element_by_xpath(dialogTitleXPATH)
    except exceptions.NoSuchElementException:
        assert False, "it's closed"

    # find and write the input field then submit
    inputTitle = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#ArticleTitleInput")))
    inputTitle.send_keys(name)
    inputDescription = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#ArticleDescriptionInput")))
    inputDescription.send_keys(description)
    inputURL = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#ArticleURLInput")))
    inputURL.send_keys(URL)

    # find and click on add tag button
    AddTagButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".AddTagButton")))
    AddTagButton.click()
    time.sleep(2)

    # write down the tag
    inputTag = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#ArticleTagInput")))
    inputTag.send_keys(tag)
    # close tag dialog
    finishButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.Finish")))
    finishButton.click()
    time.sleep(2)

    submit.click()
    time.sleep(2)
    # check if the dialog is not closed
    try:
        driver.find_element_by_xpath(dialogTitleXPATH)
        assert False, "it's not closed"
    except exceptions.NoSuchElementException:
        pass
    # check if the a group with the target name shows up
    assert len(wait.until(EC.presence_of_all_elements_located((By.XPATH, "//span[text()='%s']"%name )))) > 0

