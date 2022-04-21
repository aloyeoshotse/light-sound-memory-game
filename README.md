# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Aloye Oshotse

Time spent: 18 hours spent in total

Link to project: https://ajo-light-sound-memory-game.glitch.me/

## Required Functionality

The following **required** functionality is complete:

* [ ] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [ ] "Start" button toggles between "Start" and "Stop" when clicked. 
* [ ] Game buttons each light up and play a sound when clicked. 
* [ ] Computer plays back sequence of clues including sound and visual cue for each button
* [ ] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [ ] User wins the game after guessing a complete pattern
* [ ] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [ ] Playback speeds up on each turn
* [ ] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 2 mistakes (instead of on the first mistake)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)

The following **additional** features are implemented:

- [ ] Buttons shake upon incorrect guess
- [ ] User is able to pick between hard (10 sequences) and easy mode (5 sequences)
- [ ] The game replays pattern on incorrect guesses

## Video Walkthrough (GIF)

![](https://i.imgur.com/BL89cGH.gif)
![](https://i.imgur.com/6s4Ybjk.gif)
![](https://i.imgur.com/eQvfzCJ.gif)
![](https://i.imgur.com/mUaSsgL.gif)


## Reflection Questions
**1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.**    
   
    https://www.w3schools.com/css//css_font_websafe.asp
    
    https://www.w3schools.com/cssref/css_colors.asp
    
    https://www.delftstack.com/howto/javascript/play-audio-javascript/
    
    https://www.w3schools.com/css/css3_animations.asp

**2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)** 

During the development of my webpage, I encountered issues with the shake feature and the sounds of each button. In terms of the issue with the shake animation which I added to my game, whenever an incorrect button was chosen, it was supposed to shake and play audio which I uploaded. However, when I choose an incorrect button twice in a row, the button would only shake on the first incorrect guess. Also, the buttons would sometimes play the audio for an incorrect guess even if they were not supposed to. Unfortunately, I made the mistake of not testing the web page as soon as I added and changed a lot of my code, so I was initially lost on how to fix my problem. So I went to the functions I knew were relevant to my issues and debugged them. To do so, I first wrote down what I expected the functions to do so I could have my goal clearly visualized. I then read through all relevant functions and their conditionals to determine how they would affect my web page in certain circumstances. In my wrongGuessShake() function on line 182, I realized that I only added the shake class to each button, but never removed it so that it would be able to shake multiple times. So, I created a new function named clearShakeButton() which removed the shake class, and used a setTimeout method to call it after the button was shaking. For my audio issues, I read through the startTone() function on line 97. While reading through it, I realized that I added the feature to play my uploaded sound in the event the user picked a wrong button, but I forgot to exclude this feature for when the game was not playing. So, to fix this I added an extra conditional. Through debugging my own code, I was able to learn more about this game, and was able to find creative ways to solve the issues.

**3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)** 

In terms of web development, I am very curious about how to develop high-level web games. Would this implementation use a JavaScript alternative for Python’s Turtles? Creating a game such as a light sound memory game required more code to implement than I initially expected, so I can imagine that coding for a higher-level game would be an extremely difficult task. My second question refers to the coding languages themselves. This was my first experience with web development and using multiple coding languages on one project. Is it most efficient to use JavaScript, HTML, and CSS for web development over languages such as Python and Java? Also, how does the program use JavaScript, CSS, and HTML in tandem to produce a functioning web page?

**4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)**

If I had a few more hours to work on this project, I would spend them adding more features. First, I would love to reformat the positioning of all of the buttons on the webpage in a circular-like formation. I believe that it could have been more visually appealing to the user if the webpage resembled a physical light sound memory game. Also, I would have loved to add a feature where the user was given the option to choose how many buttons they wanted to play the game with. This feature would have added great diversity to the playability of my game and would have allowed the user to feel more in control of their experience. Additionally, I would like to have added a scoreboard to keep track of wins and losses and would have included a “high-score” feature as well. Finally, the last feature I would add is one that restricts user input while the sequence is being played. With this added feature, the game flow would no longer be interrupted.

## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright Aloye Oshotse

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
