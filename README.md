# test_runner

Initial thoughts:
Basic HTML page with a button and feedback
Set up a rails app? Probably overkill. Don't need any db.
Use HTML5 Boilerplate from Initializr for basic layout.

Basic Reqs:
Listener on the button that runs the given functions
Change something visually on the DOM when each test completes.
Track information about all tests collectively
Track information about individual tests

- The current status of each test (Not Started Yet, Running, Passed, or Failed)
- How many total tests have passed so far
- How many total tests have failed so far
- How many total tests are still running
- An indication (e.g. "FINISHED!") when all tests have completed running

I wanted to work in small steps -- see something work and then improve on it.
Thus, the test results are currently logged to the console, but not yet rendered to the page.
One blocker was that I tried to jump into the OO design too quickly and burned some time there. 

My next steps:
- Make actual DOM nodes for each piece of test data instead of just inserting innerHTML with strings.
- Go back to my Object Oriented JS branch and work on moving to a system where each test is an object that keeps track of its own state and can render information about itself
- Create a TestRunner object that tracks the test results as a whole
- Think about separating the functions into MVC pattern
- Determine what kind of test coverage is appropriate

I want to keep working on this because it's pretty fun. I'll send you what I come up with.

Updates:
- I did try out making DOM nodes instead of HTML strings but it got unwieldy quickly, so I decided against it.
- I can still see a case for making a Test model that controlls its own response, but I'm not sure it's necessary at this point.
- A view and a controller became apparent as I refactored the code, so I added those.
