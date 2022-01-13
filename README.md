# 2048 - [Live Site](https://lukebinmore.github.io/2048/)

**2048** is a game site aimed at those that like a mathmatical challenge, looking to put their strategy and numeric skills to the test.

The purpose of the site is to host the 2048 game created in JavaScript, and provide access to a mathmatical and strategic game. The purpose of the game is to provide mental stimulation and entertainment to the players.

The main aim of this project was to create a simple, and entertaining game that challenges players to think strategicly.

![AmIResponsive-01](media/2048-amiresponsive-01.png)
![AmIResponsive-02](media/2048-amiresponsive-02.png)

## Table Of Contents
- [2048 - Live Site](#2048---live-site)
  - [Table Of Contents](#table-of-contents)
  - [User Goals](#user-goals)
    - [General User Goals](#general-user-goals)
    - [Existing User Goals](#existing-user-goals)
  - [Features](#features)
    - [Existing Features](#existing-features)
  - [Technologies Used](#technologies-used)
    - [Languages](#languages)
    - [Stylings/Theme](#stylingstheme)
    - [Project Management](#project-management)
    - [Learning/Information Resources](#learninginformation-resources)
  - [Testing](#testing)
    - [Automated Testing](#automated-testing)
      - [Chrome DevTools - Lighthouse Report](#chrome-devtools---lighthouse-report)
      - [Validator Testing](#validator-testing)
    - [Manual Testing](#manual-testing)
    - [Unfixed Bugs](#unfixed-bugs)
  - [Deployment](#deployment)
  - [Credits](#credits)
    - [Information Sources/Resources](#information-sourcesresources)
    - [Content](#content)
      - [Logo](#logo)

## User Goals
### General User Goals
* User is able to interact with the game in multiple ways.
* User is able to access the game from any web browser.
* User is able to play the game on any screen size.
### Existing User Goals
* User is able to save their username.
* User is able to see past game scores.
* User is able to see a brief overview of their game results.

## Features

### Existing Features
* __Welcome Screen__
  * This feature is found on the initial landing page of the site, and provides the user with an inistial starting place.

![Welcome Screen](media/2048-splashscreen-welcome.png)

* __Username Input and Display__
  * The combination username input and display can be found on the initial landing page of the site.
  * This feature allows the user to store their scores under their own username.
  * This feature also shows the username the user previously entered.

![Username Input and Display](media/2048-splashscreen-username.png)

* __LocalStorage Usage Confirmation__
  * This feature is found on the initial landing page, and allows the user to control the usage of localStorage.

![LocalStorage Usage Confirmation](media/2048-splashscreen-localstorage.png)

* __Error Feedback__
  * This feature is located on the initial landing page.
  * The purpose of this feature is to display errors that need to be resolved before proceeding to the game.

![Error Feedback](media/2048-splashscreen-error.png)

* __Play Button__
  * This feature is located on the initial landing page.
  * The purpose of this feature is to all the user to start the game from the initial landing page.

![Play Button](media/2048-splashscreen-play.png)

* __Input Reset__
  * This feature is located on the initial landing page.
  * The purpose of this feature is to allow the user to reset their username and localStorage confirmation.

![Input Reset](media/2048-splashscreen-input-reset.png)

* __Page Buttons__
  * This feature is located on the main page.
  * The purpose of this feature is to allow the user to open the instructions and score history pages.

![Page Buttons](media/2048-page-buttons.png)

* __Instructions Page__
  * This feature is located on the main page.
  * The purpose of this feature is to provide users with information relating to how to play the game.
  * This feature also provides the user with information about the navigation of the site.

![Instructions Page](media/2048-instructions-page.png)

* __History Page__
  * This feature is located on the main page.
  * The purpose of this feature is to provide the user with information relating to the players previous scores.
  * This feature also shows the user a line graph of their previous scores.

![Score History Page](media/2048-score-history-page.png)

* __Scrolling Tips__
  * This feature is located on the main page.
  * The purpose of this feature is to provide users with tips and tricks to help them with the game, or navigating the site.

![Scrolling Tips](media/2048-scrolling-tips.png)

* __On-Screen Controls__
  * This feature is located on the main page.
  * The purpose of this feature is to provide the user with an on-screen method of interacting with the game.
  * This feature allows user's on mobile devices to play the game.

![On-Screen Controls](media/2048-on-screen-controls.png)

* __Keyboard Controls__
  * This feature is a non-visable feature of the site.
  * The purpose of this feature is to provide a more enjoyable method of interacting with the game.
  * This feature also allows the user to navigate the site with simple shortcuts.

* __Game Screen__
  * This feature is located on the main page.
  * This feature is the main game for the site.

![Game Screen](media/2048-game.png)

* __Current Score__
  * This feature is located on the main page.
  * The purpose of this feature is to show the players current game score.

![Current Score](media/2048-current-score.png)

* __Game Results Page__
  * This feature is located on the main page after the game ends.
  * The purpose of this feature is to provide the user with information relating to the game they just finished.

![Game Results Page](media/2048-game-results.png)

* __Game Reset__
  * This feature is located on the main page after the game ends.
  * The purose of this feature is to provide the user with a method of resetting the game to play again.

![Game Reset](media/2048-game-reset.png)

## Technologies Used

### Languages
* HTML
* CSS
* JavaScript

### Stylings/Theme
* [Google Fonts](https://fonts.google.com/)
  * Font's used for site:
    * Pacific
    * Bubbles
* [Font Awesome](https://fontawesome.com/)
  * Icon's used across the site:
    * Up Arrow
    * Left Arrow
    * Right Arrow
    * Down Arrow
    * Information Symbol
    * History Symbol
    * Close Symbol
* [Icon Archive](https://iconarchive.com/show/flatwoken-icons-by-alecive/Apps-2048-icon.html)
  * Icons used for this site:
    * 2048 Favicon

### Project Management
* [GitHub](https://github.com/)
  * Used for version control, hosting and deployment
* [Visual Studio Code](https://code.visualstudio.com/)
  * IDE used for development of site

### Learning/Information Resources
* [W3Schools](https://www.w3schools.com/)
  * Used for discovering specific element properties
* [Stack Overflow](https://stackoverflow.com/)
  * Used for discovering specific element properties
* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * User for discovering JavaScript specific functions, features and properties

## Testing

### Automated Testing

#### [Chrome DevTools - Lighthouse Report](https://developer.chrome.com/docs/devtools/)

**Summary:**

* Desktop:
  * The index page has a performance score of 99.
  * The index page has a accessibility score of 100.
  * The index page has a best practice score of 100.
  * The index page has an SEO score of 100.

![Chrome Devtools - Lighthouse Desktop Mode](media/2048-devtools-desktop.png)

* Mobile:
  * The index page has a performance score of 98.
  * The index page has a accessibility score of 100.
  * The index page has a best practice score of 93.
    * Improved by obtaining higher resolution logo image.
  * The index page has an SEO score of 100.

![Chrome Devtools - Lighthouse Desktop Mode](media/2048-devtools-mobile.png)

#### Validator Testing

**Summary:**

All HTML, CSS and JavaScript pages passed validators with no errors.

* HTML
  * index.html returned no errors.
  * index.html returned one warning - Section lacks heading - Controls-Section
  * [W3C Validator Results](https://validator.w3.org/nu/?doc=https%3A%2F%2Flukebinmore.github.io%2F2048%2F)
* CSS
  * style.css returned no errors.
  * style.css returned no warnings.
  * [W3C Validator Results](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Flukebinmore.github.io%2F2048%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
* JavaScript
  * index.js returned no errors.
  * index.js returned four warnings, all for google charts.

### Manual Testing

**Summary:**

During the development of this site, and upon completion, a range of different manual tests were carried out to confirm no bugs or issues remained. These tests were carried out on a range of different simulated and physical devices, on a range of different browsers.
All tests carried out: **PASSED**

<details>
<summary>Devices Tested</summary>

Simulated devices tested using [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

* Physical Devices
  * Desktop PC (Windows 10)
  * Macbook Pro (OSX)
  * Samsung Galaxy S10+ (Android)
  * iPhone 11 (IOS)
  * Kindle Fire Tablet (FireOS)
* Simulated Devices
  * Moto G4
  * Nexus 10
  * Pixel 2
  * Pixel 2 XL
  * iPhone 5/SE
  * iPhone 6/7/8
  * iPhone 6/7/8 Plus
  * iPhone X
  * iPad
  * iPad Pro
  * Surface Duo
  * Nest Hub
  * Nest Hub Max
</details>

<details>
<summary>Browsers Tested</summary>

* Chrome
* Edge
* Firefox
* Opera
* Safari
* Silk Browser
</details>

<details>
<summary>View Tests</summary>

<details>
<summary>Functional Tests</summary>

* Username Input
  * Check if existing username is pre-filled.
  * Check if user can enter text.
* Local Storage Confirmation
  * Check if existing state is pre-filled.
  * Check if user input is accepted.
* Error Message Dispaly
  * Check if error message is displayed.
  * Check if correct error message is displayed.
* Play Now Button
  * Check if game screen is loaded.
  * Check if user input is correctly validated.
  * Check if keyboard input is accepted.
* Reset Button
  * Check if inputs are cleared.
  * Check if localStorage has been cleared.
* Instructions Button
  * Check if instructions page is opened.
  * Check if close button is displayed.
* Score History Button
  * Check if score history page is opened.
  * Check if close button is displayed.
* Score History Page
  * Check if newest score is displayed.
  * Check if best score is displayed.
  * Check if Google Chart is loaded correctly.
  * Check if all scores are displayed in the correct order.
* Current Score
  * Check if current score is updated with current top score.
* 2048 Game
  * Check if game is loaded correctly.
  * Check if tiles are loaded correctly.
  * Check if all game inputs are accepted.
  * Check if game results are displayed on game end.
* Game results
  * Check if correct winner or loser status is displayed.
  * Check if correct information is loaded from history.
* Play Again Button
  * Check if play again button restarts game.
  * Check if keyboard input is accepted to restart game.
  * Check if current score is correctly reset.
* On-Screen Controls
  * Check if clicking inputs complete corresponding game movements.
* Tips
  * Check if tips scroll from right to left.
  * Check if tips scroll at correct speed.
  * Check if tips change to the next tip correctly.

</details>
<details>
<summary>View Responsiveness Tests</summary>

* Site Header
  * Check if header stays the same size reletive to the screen height.
  * Check if the content is centered on the page.
  * Check if header shrinks on smaller screens.
* Site Logos
  * Check if logos have the correct spacing in the header.
  * Check if the logos resize to fit the header.
* Welcome Heading
  * Check if heading sizes properly to fit window.
* Instructions/Score History Buttons
  * Check if buttons shrink on smaller screens.
* 2048 Game
  * Check if game sizes correctly based on screen size.
* On-Screen Controls
  * Check if controls are sized correctly based on screen size.
* Tips
  * Check if tips speed is adjusted based on window width.

</details>
</details>

### Unfixed Bugs

* There are currently no known errors or issues.

## Deployment

The development of this site has been done so in the "main" branch. This branch has been deployed using GitHub Pages, with the live site being the most recent commit in this branch.

This site was deployed by completing the following steps:

1. Opened [GitHub](https://github.com/) and opened the "2048" repository.
2. Navigated to the "Settings" page of the repository.
3. Navigated to the "Pages" page of the repository.
4. Selected the "main" branch and selected "Save" to save as the deployed branch.
5. The link to the live deployed site was then presented.

[Live Site](https://lukebinmore.github.io/2048/)

## Credits

### Information Sources/Resources

### Content

#### Logo