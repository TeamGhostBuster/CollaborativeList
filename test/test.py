from test_authentication import test_authentication
import sys


assert len(sys.argv) == 3, "usage: python <testFile> <email> <password>"
username = sys.argv[1]
password = sys.argv[2]
url = "http://local.vfree.org:5000"

# test case 1
test_authentication(url, username, password)
print("passed login!")


