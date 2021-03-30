#!/usr/bin/env python
import subprocess, platform, shutil, sys, os

env = platform.system()
current_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
python_path = sys.executable if sys.executable else "python"

OSConfig = {
    "windows": {
        "name": "Windows",
        "opts": [python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--noconsole", "--name", env, "--add-data", "src/data/brain.brn;.", "--add-data", "src/data/symptoms.json;.", "--add-data", "src/data/predicates.json;.", "--distpath", "bin", "--onefile"],
    },
    "macos": {
        "name": "Darwin",
        "opts": [python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--noconsole", "--name", env, "--add-data", "src/data/brain.brn:.", "--add-data", "src/data/symptoms.json:.", "--add-data", "src/data/predicates.json:.", "--distpath", "bin", "--onefile"],
    },
    "linux": {
        "name": "Linux",
        "opts": [python_path, "-m", "PyInstaller", os.path.join(current_dir, "src", "bot.py"), "--name", env, "--add-data", "src/data/brain.brn:.", "--add-data", "src/data/symptoms.json:.", "--add-data", "src/data/predicates.json:.", "--distpath", "bin", "--onefile"],
    },
}

if env not in [ y["name"] for x, y in OSConfig.items() ]:
    raise NotImplementedError("Your OS is not supported, sorry!")

# Preexisting build should be removed to avoid collecting garbage
if os.path.isdir(os.path.join(current_dir, "bin")):
    shutil.rmtree(os.path.join(current_dir, "bin"))
    
for script_name in ["datagrabber.py", "brainsaver.py"]:
    try:
        subprocess.run([python_path, os.path.join(current_dir, "src", script_name)], cwd=current_dir)
    except Exception as e:
        print(f"The pre-build script \"{script_name}\" has failed: {str(e)}")
        sys.exit(1)

try:
    opts = [ y["opts"] for x, y in OSConfig.items() if env in y["name"] ][0]
    subprocess.run(opts, cwd=current_dir)
    os.remove(os.path.join(current_dir, env + ".spec"))
except Exception as e:
    print(f"The program has failed: {str(e)} -> Check if required dependencies are installed")
    sys.exit(1)

# Temporary PyInstaller build files
shutil.rmtree(os.path.join(current_dir, "build"))

print("Bot has finished compiling - find result in /bin/")
sys.exit(0)
