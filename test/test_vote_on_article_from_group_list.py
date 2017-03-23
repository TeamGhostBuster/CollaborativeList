from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_vote_on_article_from_group_list(driver, wait):
    originCount = int(wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.VoteCount span"))).text)
    upvoteButton = wait.until(EC.presence_of_element_located((By.NAME,"Upvote")))
    downvoteButton = wait.until(EC.presence_of_element_located((By.NAME,"Downvote")))

    # click upvote, should increate 1
    upvoteButton.click()
    time.sleep(2)
    assert int(wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.VoteCount span"))).text) - originCount == 1

    # click upvote again should not change
    upvoteButton.click()
    time.sleep(2)
    assert int(wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.VoteCount span"))).text) - originCount == 1

    # click downvote should back to original
    downvoteButton.click()
    time.sleep(2)
    assert int(wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.VoteCount span"))).text) - originCount == 0

    # click downvote again should be decrease 1
    downvoteButton.click()
    time.sleep(2)
    assert int(wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.VoteCount span"))).text) - originCount == -1

    # click downvote again again should not change
    downvoteButton.click()
    time.sleep(2)
    assert int(wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,"div.VoteCount span"))).text) - originCount == -1