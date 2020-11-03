#!/usr/bin/env python
import sys
from time import time
from response_handler import Chatbot

def main():
    # Receive user input from console (ran by PHP)
    user_text = sys.argv[1]
    
    # Time our response, and receive response from bot class
    start = time()
    response = Chatbot.generate(user_text)
    end = time()

    # Produce our output via stdout as to not produce any extra
    # whitespace or newlines
    sys.stdout.write(response)
    sys.stdout.flush()

if __name__ == "__main__":
    main()