# The-Procrastinators

School Project for Studio 1 during Noroff enrolment.\
Marvin is a Chatbot project intended to provide the user with a fuller experience\
of what it is to communicate with a computer. In a sense, it's communication\
between you and your own computer, but dressed up with animations, 3D-models and\
a recognizable voice. He also might give you some bad medical advice...

### Team members who made this possible

- Øyvind Finsnes
- Stian Andersen
- Mads Merkesdal
- ~~Morten Davidsen~~ :(

## Local testing/compilation requirements.
##### (NOTE: This is not really intended for anyone to do, we will provide you<br/>with the correct final application, but this is here for those who want it and<br/>are interested).

#### 1. Python Chatbot compilation

1. In the folder `/app/` there will be another folder named `/chatbot/` and then\
   `/bin/`. This needs to contain a folder named after the operating system you\
   are using (ex. `/Windows/`).
- If there is a folder here named correctly after your OS, it should all work.\
Proceed to [Electron app compilation](####-2.-Electron-app-compilation).
- If there is a folder there named something else than your OS, continue the steps.
1. Your machine needs a local installation of `Python` (3.6.x), which is the only\
version of Python the project has been tested with.
3. The chatbot is dependent on the packages `pyinstaller`, `aiml` and `spacy`.\
Ensure these are installed and available to Python (usually installed using `PIP`).
1. Run the script `compiler.py` inside the `/chatbot/` folder using `Python` (running\
the Python script using any command prompt / terminal is fine).
5. The folder `/bin/` should now contain a folder named after your OS.

#### 2. Electron app compilation

1. Download the `NodeJS` runtime (with `npm`). `npm` should now be available as\
   a global command.
2. Navigate into the project folder (at the top level) and run:
   ```
   npm install
   ```
3. A folder named `/node_modules/` should appear containing the appropriate\
   dependencies.
4. Depending on your current Operating System, run ONE of the following:
   ```
   npm run pkg-win

   npm run pkg-mac

   npm run pkg-lin
   ```
5. The packaged app will appear under `/release-builds/`.

#### 3. HELP! My (already compiled) application doesn't work

In a situation like this with a lot of moving parts, it can be hard to tell why\
the application won't run. However, in all likelihood, it would be one of the\
issues listed below (this is not an extensive list by any means):

- We encountered an issue on Windows machines where Windows Defender (and likely\
  other antivirus software) will tag unsigned executables as a threat. Depending\
  on how the Electron app was compiled, this may be an issue for the Chatbot\
  executable as we have experienced. The solution is simply to try running it\
  again, and if the issue persist try to whitelist the program.
- The application has not been tested on MacOS, and might very well fail at most\
  points.
- The application has barely been tested on Linux, and only one distribution at\
  that (Arch Linux - Manjaro).
- Building for MacOS on Windows yields an error because Windows needs admin\
  privileges to form symlinks. Build for MacOS on another platform.