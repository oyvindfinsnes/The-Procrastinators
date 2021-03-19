#!/usr/bin/env python
import subprocess
import platform
import shutil
import sys
import os

env = platform.system()
supported_env = {
    "windows": "Windows",
    "macos": "Darwin",
    "linux": "Linux"
}
current_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
python_path = sys.executable if sys.executable else "python"

if env not in supported_env.values():
    raise NotImplementedError("Your OS is not supported, sorry!")

# Preexisting distribution should be removed to avoid collecting garbage
if os.path.isdir(os.path.join(current_dir, "dist")):
    shutil.rmtree(os.path.join(current_dir, "dist"))

if not os.path.isfile(os.path.join(current_dir, "src", "brain.brn")):
    try:
        subprocess.run([python_path, os.path.join(current_dir, "src", "builder.py")], cwd=current_dir)
    except Exception as e:
        print(f"The nested \"bot.py\" has failed to initialize: {str(e)}.")
        sys.exit(1)

# In a Windows environment, we want to simply compile the script and its
# sources into a single executable.
if env == supported_env["windows"]:
    try:
        subprocess.run([python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--noconsole", "--name", supported_env["windows"], "--add-data", "src/brain.brn;."], cwd=current_dir)
        os.remove(os.path.join(current_dir, supported_env["windows"] + ".spec"))
    except Exception as e:
        print(f"The program has failed: {str(e)}. Check if required Python dependency \"pyinstaller\" or \"aiml\" is installed.")
        sys.exit(1)

# While MacOS ships with Python by default, the version is 2.7. As we are using
# 3.x for the project, we want to compile into a single executable.
elif env == supported_env["macos"]:
    try:
        subprocess.run([python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--noconsole", "--name", supported_env["macos"], "--add-data", "src/brain.brn:."], cwd=current_dir)
        os.remove(os.path.join(current_dir, supported_env["macos"] + ".spec"))
    except Exception as e:
        print(f"The program has failed: {str(e)}. Check if required Python dependency \"pyinstaller\" or \"aiml\" is installed.")
        sys.exit(1)

# Since it is very difficult to determine which Python version the current Linux
# distribution uses, we want to compile into a single executable for simplicity.
elif env == supported_env["linux"]:
    try:
        subprocess.run([python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--name", supported_env["linux"], "--add-data", "src/brain.brn:."], cwd=current_dir)
        os.remove(os.path.join(current_dir, supported_env["linux"] + ".spec"))
    except Exception as e:
        print(f"The program has failed: {str(e)}. Check if required Python dependency \"pyinstaller\" or \"aiml\" is installed.")
        sys.exit(1)

shutil.rmtree(os.path.join(current_dir, "build"))
print("Bot has finished compiling - find result in dist/")
sys.exit(0)
