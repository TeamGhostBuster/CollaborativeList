from selenium.common import exceptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def test_view_article_from_person_list(driver, wait, title, description, URL, tag):

    # find and click on the details button
    detialButton = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".DetailButton")))
    detialButton.click()
    time.sleep(2)

    # constant
    titleText = "Title:\n"+title
    descriptionText = "Description:\n"+description
    URLText = "URL:\n"+URL

    # check if we can see the title, description, URL and tag
    t = wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, 'p')))
    assert titleText==t[0].text, "title not match"
    assert descriptionText==t[1].text, "description not match"
    assert URLText==t[2].text, "URL not match"
    try:
        driver.find_element_by_xpath("//span[text()='%s']"%tag)
    except exceptions.NoSuchElementException:
        assert False, "no such tag"
