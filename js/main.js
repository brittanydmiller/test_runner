function TestRunnerView() {
  this.finalMessage = document.createElement("h2");
  this.statsBox = document.getElementById("js-stats");
  this.testContainer = document.getElementById("js-test-container");
  this.testRunnerButton = document.getElementById("js-test-runner");
};

TestRunnerView.prototype = {
  loadTests: function(){
    var html = "";
    for ( test in tests ) {
      html = html + "<div><h2>Test " + test + "</h2><h3>Status: <span id=\"status"+ test +"\">Not Started Yet</span></h3><p>" + tests[test]["description"] + "<p></div>";
    }
    this.testContainer.innerHTML = html;
  },
  updateTest: function(text, index){
    document.getElementById("status" + index).innerText = text;
  },
  updateStat: function(statId, statValue){
    document.getElementById(statId).innerText = statValue;
  },
  showFinalMessage: function(){
    this.finalMessage.innerText = "All Tests Completed!"
    this.statsBox.appendChild(this.finalMessage);
  }
}

function generateDummyTest() {
  var delay = 7000 + Math.random() * 7000;
  var testPassed = Math.random() > 0.5;

  return function(callback) {
    setTimeout(function() {
      callback(testPassed);
    }, delay);
  };
}

var tests = [
  { description: "commas are rotated properly",          run: generateDummyTest() },
  { description: "exclamation points stand up straight", run: generateDummyTest() },
  { description: "run-on sentences don't run forever",   run: generateDummyTest() },
  { description: "question marks curl down, not up",     run: generateDummyTest() },
  { description: "semicolons are adequately waterproof", run: generateDummyTest() },
  { description: "capital letters can do yoga",          run: generateDummyTest() }
];

function TestRunnerController(view) {
  this.testRunnerView = view;
  this.testsPassed = 0;
  this.testsFailed = 0;
  this.testsRunning = 0;
  this.testsCompleted = 0;
};

TestRunnerController.prototype = {
  runTests: function(){
    this.testsRunning = tests.length;
    tests.forEach(function(currentValue, index, array){
      currentValue.run( function(){
        if(arguments[0] == true) {
          this.testRunnerView.updateTest("Passed", index);
          this.testsPassed += 1;
        } else {
          this.testRunnerView.updateTest("Failed", index);
          this.testsFailed += 1;
        }
        this.testsCompleted += 1;
        this.testsRunning -= 1;
        this.testRunnerView.updateStat("passed", this.testsPassed);
        this.testRunnerView.updateStat("failed", this.testsFailed);
        this.testRunnerView.updateStat("running", this.testsRunning);
        this.testRunnerView.updateStat("completed", this.testsCompleted);
        if (this.testsCompleted === tests.length) {
          this.testRunnerView.showFinalMessage();
        }
      }.bind(this));
    }.bind(this));
  }
}

window.onload = function(){
  var testRunnerView = new TestRunnerView();
  var testRunnerController = new TestRunnerController(testRunnerView);
  document.getElementById("js-test-runner").addEventListener("click", testRunnerController.runTests.bind(testRunnerController));
  testRunnerView.loadTests();
}

