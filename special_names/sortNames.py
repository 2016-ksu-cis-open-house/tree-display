###########################################################
# Alphabetize Names
#
# Author: Joy Hauser
# Date: 3/9/2016
###########################################################
import sys
import os

# Initialize variables
nameList = []
sortedNameList = []
fileName = 'whitelist.txt'

# Get names from raw_input file
with open(fileName, 'r+') as input:
    # Get input from file
    for line in input:
        name = line.strip('\n')

        # Verify that there isn't another copy of the name
        # in the list already
        if(name not in nameList):
            nameList.append(name)

    # Empty file
    input.close()
    os.remove(fileName)

with open(fileName, 'w') as output:
    # Sort the name list alphabetically
    nameList.sort()

    # Put output in file
    for name in nameList:
        output.write(name + '\n')