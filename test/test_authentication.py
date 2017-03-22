from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_authentication(url, u, p):
    # Start the driver
    driver = webdriver.Firefox()
    wait = WebDriverWait(driver, 10)

    driver.get(url)

    '''
  reference:
    http://stackoverflow.com/questions/36645400/how-to-selenium-test-a-website-that-uses-google-oauth
    http://stackoverflow.com/questions/19403949/how-to-handle-pop-up-in-selenium-webdriver-using-java
  '''
    # Click 'Login with Google' button
    driver.find_element_by_xpath("//button[text()='Login with Google']").click()

    # go to login popup window
    driver.switch_to.window(driver.window_handles[1])

    # type email
    wait.until(EC.presence_of_element_located((By.ID, "Email"))).send_keys(u)

    # click next
    wait.until(EC.presence_of_element_located((By.ID, "next"))).click()

    # type password
    wait.until(EC.presence_of_element_located((By.ID, "Passwd"))).send_keys(p)

    # click signin
    wait.until(EC.presence_of_element_located((By.ID, "signIn"))).click()

    # go back to login place:
    driver.switch_to.window(driver.window_handles[0])

    # make sure we are logged in
    wait.until(EC.presence_of_element_located((By.XPATH, "//h1[text()='Personal List']")))

    if function:
        function(params)

    # find the create group button
    createButton = driver.find_element_by_class_name("createListButton")
    createButton.click()

    cancel = driver.find_element_by_css_selector("button.Cancel")
    cancel.click()

    createButton.click()
    submit = driver.find_element_by_css_selector("button.Submit")
    submit.click()

    input = driver.find_element_by_css_selector("input#ListNameInput").send_keys("what")
    submit.click()

    driver.quit()
    # wait.until(EC.presence_of_element_located((By.CLASS_NAME, "createListButton"))).click()
    # wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.Cancel"))).click()
    #
    # wait.until(EC.presence_of_element_located((By.CLASS_NAME, "createListButton"))).click()
    # wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button.Submit"))).click()

    # wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input#ListNameInput"))).send_keys("what")

    # driver.close()
