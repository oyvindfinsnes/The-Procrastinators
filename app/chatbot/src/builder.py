#!/usr/bin/env python
import os.path as path
import aiml
import sys

kernel = aiml.Kernel()
current_dir = path.dirname(path.abspath(sys.argv[0]))

kernel.bootstrap(learnFiles = path.join(current_dir, "data", "*.aiml"), commands = "load aiml b")
kernel.saveBrain(path.join(current_dir, "brain.brn"))
