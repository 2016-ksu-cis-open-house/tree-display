###########################################################
# Alphabetize Names
#
# Author: Joy Hauser
# Date: 3/9/2016
###########################################################

# Initialize variables
nameList = set()
fileName = 'whitelist.txt'

# Get names from raw_input file
with open(fileName, 'r+') as input:
    # Get input from file
    for name in input.read().split():
        nameList.add(name)

nameList = list(nameList)

with open(fileName, 'w') as output:
    # Sort the name list alphabetically
    nameList.sort()

    # Put output in file
    for name in nameList:
        output.write(name + '\n')