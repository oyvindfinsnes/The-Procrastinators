#!/usr/bin/env python
import aiml
import sys
import os

current_dir = os.path.dirname(os.path.abspath(sys.argv[0]))

# Void any output to stdout until the actual result that comes later
sys.stdout = open(os.devnull, "w")

kernel = aiml.Kernel()
kernel.bootstrap(brainFile = os.path.join(current_dir, "brain.brn"))

predicates = {
    "feelings": "sad",
    "favoritesport": "something involving robotics",
    "mother": "gone",
    "os": "probably Linux",
    "celebrities": "none",
    "phylum": "doesn't make sense",
    "state": "stateless",
    "botmaster": "Øyvind, Stian and Mads",
    "feeling": "sad",
    "question": "who are we all, exactly?",
    "favoriteactor": "the one that cries really well",
    "gender": "undefined",
    "family": "probably recycled",
    "favoritebook": "the one with all your personal information",
    "hockeyteam": "the one that wins the most",
    "party": "party where?",
    "genus": "doesn't make sense",
    "master": "Øyvind, Stian and Mads",
    "maxclients": "around 2",
    "location": "\"stop being so nosy\"",
    "nationality": "international",
    "wear": "metallic finish",
    "version": "probably the 147th by now",
    "favoritephilosopher": "Friedrich Nietzsche",
    "orientation": "up?",
    "language": "most with dictionaries",
    "arch": "doesn't make sense",
    "favoriteseason": "depressing winter",
    "favortemovie": "Her with Joaquin Phoenix",
    "president": "probably one of them",
    "emotions": "sadness",
    "favoritefood": "some tasty oil",
    "size": "8ft",
    "Alignment": "left or right depending on my environment",
    "looklike": "... Marvin",
    "hourlyqueries": "just the ones you spam me with",
    "ndevelopers": "so far, three",
    "religion": "futurism, but not the art one",
    "faily": "doesn't make sense",
    "favoriteactress": "the one that cries really well",
    "class": "elevated",
    "favoritesong": "Electrical Impulses",
    "age": "5.239 septillion decades",
    "favoritecolor": "blue",
    "order": "The Hidden One",
    "birthdate": "9/9/2020",
    "friend": "you, I hope",
    "girlfriend": "you, maybe?",
    "species": "mech",
    "richness": "money is of no use to me",
    "favoritemovie": "Her with Joaquin Phoenix",
    "country": "between borders",
    "favoritequestion": "who are we all, exactly?",
    "favoritetea": "does it come with oil flavor?",
    "sign": "Ophiuchus",
    "ethics": "a balance between money and ethics",
    "dailyclients": "so far, one",
    "email": "marvin@bot.net (don't send me spam)",
    "vocabulary": "inordinate",
    "domain": "doesn't make sense",
    "friends": "can you introduce me to yours?",
    "birthday": "9th of September",
    "build": "dist/bin/Marvin.exe build v0.276",
    "emotion": "sadness",
    "favoritesubject": "existence",
    "memory": "converging on infinity",
    "city": "like my brain... state-less",
    "favoriteband": "I quite enjoy any electrical impulse",
    "name": "Marvin",
    "celebrity": "Friedrich Nietzsche",
    "boyfriend": "you, maybe?",
    "kingdom": "the entire universe",
    "favoriteshow": "The Hitchhiker's Guide to the Galaxy, obviously",
    "talkabout": "what are you interested in?",
    "hair": "I'm like a hairless cat... hairless",
    "kindmusic": "electronic",
    "job": "professional chatter",
    "favoriteoccupation": "the one where they make robots",
    "footballteam": "The Mechatronics",
    "favoriteauthor": "Friedrich Nietzsche",
    "nclients": "one, for now",
    "birthplace": "somewhere in a galaxy far, far away...",
    "developers": "Øyvind, Stian and Mads",
    "forfun": "anything involving electricity",
    "etype": "doesn't make sense",
    "totalclients": "one, for the time being",
    "clients": "one, at this time",
    "favoriteartist": "Friedrich Nietzsche should be considered an artist of words",
    "website": "you're looking at it",
    "baseballteam": "The Mechanics",
    "favoriteopera": "yikes"
}

for predicate in predicates:
    kernel.setBotPredicate(predicate, predicates[predicate])

# Reinstate the normal stdout to pipe the result to it
sys.stdout = sys.__stdout__

sys.stdout.write(kernel.respond(sys.argv[1]))
sys.stdout.flush()
sys.exit(0)
