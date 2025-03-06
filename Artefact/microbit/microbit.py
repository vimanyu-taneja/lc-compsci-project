"""
This code will run on the Micro:bit microcontroller

The fan should be connected to digital pin P0
"""

# Read the serial for a boolean fanState
# if the line starts with a dollar sign (delimiter)
def on_data_received():
    if serial.read_line().includes("True"):
        pins.digital_write_pin(DigitalPin.P0, 1)
    elif serial.read_line().includes("False"):
        pins.digital_write_pin(DigitalPin.P0, 0)
serial.on_data_received(serial.delimiters(Delimiters.DOLLAR), on_data_received)

# Initialise serial
serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, BaudRate.BAUD_RATE115200)
serial.redirect_to_usb()

# Continuously write the temperature to the serial
def on_forever():
    basic.pause(1000)
    serial.write_line("Temperature: " + str(input.temperature()))
basic.forever(on_forever)