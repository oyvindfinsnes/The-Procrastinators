#!/usr/bin/env python
import os.path as path, aiml, sys

kernel = aiml.Kernel()
current_dir = path.dirname(path.abspath(sys.argv[0]))

kernel.bootstrap(learnFiles = path.join(current_dir, "data", "aiml", "*.aiml"), commands = "load aiml b")
kernel.saveBrain(path.join(current_dir, "data", "brain.brn"))
