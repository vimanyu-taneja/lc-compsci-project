"""
This code will run on the computer connected to the Micro:bit in order to send data to and receive data from the microcontroller via the serial

Before starting, make sure you have adequate read, write, and execute permissions on the port used by doing the following commands in the terminal:
ls -@l /dev/tty.usbmodem11102 (to check permissions)
sudo chmod 777 /dev/tty.usbmodem11102 (to give full read/write/execute access)

The above commands are for MacOS Monterey. If you're on another operating system, then use the equivalent commands accordingly.

Note that "usbmodem11102" may have to be changed throughout the code depending on the port used
"""

import pyrebase
from time import sleep
import re
import serial

firebaseConfig = {
  "apiKey": "XXX",
  "authDomain": "XXX",
  "databaseURL": "XXX",
  "projectId": "XXX",
  "storageBucket": "XXX",
  "messagingSenderId": "XXX",
  "appId": "XXX"
};

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

ser = serial.Serial(port="/dev/tty.usbmodem11102", baudrate=115200, timeout=1, write_timeout=1)
ser.close()
ser.open()
sleep(2)

while True:
    
    serialRead = str(ser.readline())

    # Temperature information in the serial is given in the format:
    # Temperature: X
    if serialRead.startswith("b'Temperature: "):
        temp = re.findall(r'\d+', serialRead) # RegEx to match numbers
        temp = int(temp[0])
        db.child("devices/1/device/temp").set(temp)

    # Get the fan state from Firebase
    websiteData = db.child("devices/1/website").get()
    for item in websiteData.each():
        if item.key() == "fanOn":
            fanState = item.val()

    # Write the current fan state to the serial in the format:
    # $Fan State: X
    fanState = "$Fan State: " + str(fanState) + " \r\n"
    ser.write(fanState.encode())