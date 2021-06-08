# 03-password-generator

## Task

In this project, I was tasked to write a JS script to generate a password that satisfies user criteria. In particular, the script need to ask a user to specify:
- a length of password that must be between 8 and 128; and 
- character types to include in the password.
The character types available are lowercase, uppercase, numeric, and special characters. The password generated must contain at least one character from the type selected. This will be displayed in a box.


### Preview

The end product should resemble the mock-up provided below:

![Password generator demo](./assets/demo/screenshot.png)

> **Note:** This layout will not look as good when the resolution drops below 300px.


## Installation
[(Back to top)](#task)

To use this project, first clone the repo on your device using the commands below:

  git init
  git clone https://github.com/Supasiti/03-password-generator.git

## Usage
[(Back to top)](#task)

The final webpage can be accessed through the following [link](https://supasiti.github.io/03-password-generator/).


## Design Consideration
[(Back to top)](#task)

The workflow for user looks like:
  specify password length --> choose lowercase or not --> choose uppercase or not -->
  choose special characters or not --> choose numeric or not --> password is generated

To meet all the acceptance criteria above, the following design decisions were considered.

### Acceptable input for password length
- Only acceptable input for password length is an integer between 8 and 128.
- A user will be prompted to enter a length again if they entered incorrectly.
- A user can 

