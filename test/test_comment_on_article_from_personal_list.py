from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_comment_on_article_from_personal_list(driver, wait, comment):
    #constant
    commentXPATH = "//div[text()='%s']"%comment

    # find and click the add comment button
    createButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"button.AddCommentButton")))
    createButton.click()

    # find and write the comment
    inputComment = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#CommentInput")))
    inputComment.send_keys(comment)

    # find and click on the cancel key
    cancelButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"button.CommentCancel")))
    cancelButton.click()
    time.sleep(2)

    # test if the comment is still there
    try:
        driver.find_element_by_xpath(commentXPATH)
        assert False, "the comment is still there after click cancel"
    except exceptions.NoSuchElementException:
        pass

    # find and click the add comment button
    createButton.click()

    # find and write the comment
    inputComment = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea#CommentInput")))
    inputComment.send_keys(comment)
    time.sleep(1)

    # click on the submit button
    submitButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"button.CommentSubmit")))
    submitButton.click()
    time.sleep(2)

    # test if the comment is still there
    try:
        driver.find_element_by_xpath(commentXPATH)
    except exceptions.NoSuchElementException:
        assert False, "the comment is not there after click submit"
