#!/usr/bin/env python
import subprocess, platform, shutil, sys, os

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

# Preexisting build should be removed to avoid collecting garbage
if os.path.isdir(os.path.join(current_dir, "bin")):
    shutil.rmtree(os.path.join(current_dir, "bin"))


def run_script(name):
    try:
        subprocess.run([python_path, os.path.join(current_dir, "src", name)], cwd=current_dir)
    except Exception as e:
        print(f"The script \"{name}\" has failed: {str(e)}.")
        sys.exit(1)


run_script("datagrabber.py")
run_script("brainsaver.py")


if env == supported_env["windows"]:
    try:
        subprocess.run([python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--noconsole", "--name", supported_env["windows"], "--add-data", "src/data/brain.brn;.", "--add-data", "src/data/symptoms.json;.", "--add-data", "src/data/predicates.json;.", "--distpath", "bin", "--onefile"], cwd=current_dir)
        os.remove(os.path.join(current_dir, supported_env["windows"] + ".spec"))
    except Exception as e:
        print(f"The program has failed: {str(e)}. Check if required dependencies are installed.")
        sys.exit(1)

elif env == supported_env["macos"]:
    try:
        subprocess.run([python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--noconsole", "--name", supported_env["macos"], "--add-data", "src/data/brain.brn:.", "--add-data", "src/data/symptoms.json:.", "--add-data", "src/data/predicates.json:.", "--distpath", "bin", "--onefile"], cwd=current_dir)
        os.remove(os.path.join(current_dir, supported_env["macos"] + ".spec"))
    except Exception as e:
        print(f"The program has failed: {str(e)}. Check if required dependencies are installed.")
        sys.exit(1)

elif env == supported_env["linux"]:
    try:
        subprocess.run([python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--name", supported_env["linux"], "--add-data", "src/data/brain.brn:.", "--add-data", "src/data/symptoms.json:.", "--add-data", "src/data/predicates.json:.", "--distpath", "bin", "--onefile"], cwd=current_dir)
        os.remove(os.path.join(current_dir, supported_env["linux"] + ".spec"))
    except Exception as e:
        print(f"The program has failed: {str(e)}. Check if required dependencies are installed.")
        sys.exit(1)


# Temporary PyInstaller build files
shutil.rmtree(os.path.join(current_dir, "build"))

print("Bot has finished compiling - find result in /bin/")
sys.exit(0)
