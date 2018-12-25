import os
from subprocess import run
dir = "."
for f in os.listdir(dir):
    filename, file_extension = os.path.splitext(f)
    if file_extension == ".svg":
        command = "magick convert -density 205 -channel RGB -negate -colorspace gray " + filename + ".svg " + filename + ".png"
        run(command)
        print (command)
   
