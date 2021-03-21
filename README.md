# The-Procrastinators

School Project for Studio 1 during Noroff enrolment.

## Team members who made this possible

- Øyvind Finsnes
- Stian Andersen
- Mads Merkesdal
- ~~Morten Davidsen~~ :(

### Local testing/deployment requirements

#### If you'd like to test this project locally, a few steps might be needed.<br/>(NOTE: This is not really intended for you to do, we will provide you with<br/>the correct final application, but this is here for those who want it).

##### Python Chatbot compilation

- In the folder "chatbot" there will be another folder called "dist". This needs\
to contain a folder named after the operating system you are using (ex. Windows).
- If there is a folder here named correctly after your OS, it should all work.\
Proceed to project compilation.

- If there is a folder here named something else than your OS, continue the steps.
- Your machine needs a local installation of Python (3.6.x), which is the only\
version of Python the project has been tested against.
- The chatbot is dependant on the packages "pyinstaller", "aiml" and "spacy".\
Ensure these are installed and available to Python (usually installed using PIP).
- Run the script "compiler.py" inside the "chatbot" folder using Python (running\
the Python script using any command prompt is fine).
- The folder "dist" should now contain a folder named after your OS.

##### Electron app compilation

- write the stuff about running electron builder