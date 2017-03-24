from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

'''
reference:
http://stackoverflow.com/questions/36645400/how-to-selenium-test-a-website-that-uses-google-oauth
http://stackoverflow.com/questions/19403949/how-to-handle-pop-up-in-selenium-webdriver-using-java
'''
def test_authentication(url, u, p, driver, wait):

    driver.get(url)

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
    assert len(wait.until(EC.presence_of_all_elements_located((By.XPATH, "//h1[text()='Personal List']")))) > 0


