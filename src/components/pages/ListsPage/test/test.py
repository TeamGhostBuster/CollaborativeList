from selenium import webdriver
from python_hosts import Hosts, HostsEntry

myhost = Hosts('C:\Windows\System32\drivers\etc\hosts')
new_host = HostsEntry(entry_type='ipv4', address='127.0.0.1', names=['www.googleapis.com'])
myhost.add([new_host])
myhost.write()

# Create a new instance of the Firefox driver
driver = webdriver.Firefox()

# go to the google home page
driver.get("http://local.vfree.org:5000")

# the page is ajaxy so the title is originally this:
print (driver.title)
a = driver.find_element_by_tag_name('button')


a.click()

