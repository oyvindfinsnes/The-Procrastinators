# The-Procrastinators

School Project for Studio 1 during Noroff enrolment.\
Marvin is a Chatbot project intended to provide the user with a fuller experience\
of what it is to communicate with a computer. In a sense, it's communication\
between you and your own computer, but dressed up with animations, 3D-models ~~and\
a recognizable voice~~. He also might give you some bad medical advice...

### What does Marvin look like?

![Screenshot 2023-04-27 185835](https://user-images.githubusercontent.com/22096766/234936038-fca7d0c3-86bf-4f7d-ba13-2daddfefeff0.png)

### Team members who made this possible

-  Øyvind Finsnes
-  Stian Andersen
-  Mads Merkesdal
-  ~~Morten Davidsen~~ :(

## Local testing/compilation requirements
##### (NOTE: This uses a Python script compiled to an executable that is run using NodeJS).

#### 1. Python Chatbot compilation

1. In the folder `/app/` there will be another folder named `/chatbot/` and then\
   `/bin/`. This needs to contain a file (executable) named after the operating\
   system you are using (ex. `Windows.exe`).
-  If there is a file here named correctly after your OS, proceed to\
   [Electron app compilation](####-2.-Electron-app-compilation).
-  If there is a file here named something else than your OS, or the\
   `/bin/` folder does not exist yet, continue the steps.
1. Your machine needs a local installation of `Python` (3.6.x), which is the only\
   version of Python the project has been tested with.\
   (https://www.python.org/downloads/)
2. The chatbot is dependent on some packages described in `requirements.txt`,\
   located in the `/chatbot/` directory. Ensure these are installed and available\
   to Python. Run the following INSIDE THE `/chatbot/` DIRECTORY:
   ```
   python -m pip install -r requirements.txt
   ```
3. Run the script `compiler.py` INSIDE THE `/chatbot/` DIRECTORY using `Python`:
   ```
   python ./compiler.py
   ```
4. The folder `/bin/` should now contain a file (executable) named after your OS.

#### 2. Electron app compilation

1. Download the `NodeJS` runtime (with `npm`). `npm` should now be available as\
   a global command.\
   (https://nodejs.org/en/)
2. Navigate into the project folder AT THE TOP LEVEL and run:
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
5. The packaged app will appear under `/release_builds/`.

#### 3. HELP! My (already compiled) application doesn't work

In a situation like this with a lot of moving parts, it can be hard to tell why\
the application won't run. However, in all likelihood, it would be one of the\
issues listed below (this is not an extensive list by any means):

-  We encountered an issue on Windows machines where Windows Defender (and likely\
   other antivirus software) will tag unsigned executables as a threat. Depending\
   on how the Electron app was compiled, this may be an issue for the Chatbot\
   executable as we have experienced. The solution is simply to try running it\
   again, and if the issue persist try to whitelist the program.
-  We encountered another issue on Windows where the executable wouldn't run,\
   most likely due to Windows Defender or some other antivirus flagging it. As\
   this might also happen on other Operating Systems, try to run the executable\
   in cmd/terminal if it does:
   ```
   ./the-procrastinators.exe (Windows)

   ./the-procrastinators.app (MacOS)

   ./the-procrastinators (Linux)
   ```
-  The application has not been tested on MacOS, and might very well fail at most\
   points.
-  The application has barely been tested on Linux, and only one distribution at\
   that (Arch Linux - Manjaro).
-  Building for MacOS on Windows yields an error because Windows needs admin\
   privileges to form symlinks. Build for MacOS on another platform.
