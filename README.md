# The-Procrastinators

School Project for Studio 1 during Noroff enrolment.

### Team members who made this possible

- Øyvind Finsnes
- Stian Andersen
- Mads Merkesdal
- ~~Morten Davidsen~~ :(

### Local testing/compilation requirements.
##### (NOTE: This is not really intended for anyone to do, we will provide you<br/>with the correct final application, but this is here for those who want it and<br/>are interested).

#### Python Chatbot compilation

1. In the folder "chatbot" there will be another folder called "dist". This needs\
to contain a folder named after the operating system you are using (ex. Windows).
- If there is a folder here named correctly after your OS, it should all work.\
Proceed to electron app compilation below.
- If there is a folder here named something else than your OS, continue the steps.
2. Your machine needs a local installation of Python (3.6.x), which is the only\
version of Python the project has been tested against.
3. The chatbot is dependant on the packages "pyinstaller", "aiml" and "spacy".\
Ensure these are installed and available to Python (usually installed using PIP).
4. Run the script "compiler.py" inside the "chatbot" folder using Python (running\
the Python script using any command prompt is fine).
5. The folder "dist" should now contain a folder named after your OS.

#### Electron app compilation

- write the stuff about running electron builder