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
  var delay = 1000 + Math.random() * 2000;
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

var tests_passed = 0;
var tests_failed = 0;
var tests_running = 0;
var tests_completed = 0;

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

function TestRunnerController(view) {
  this.testRunnerView = view;
};

TestRunnerController.prototype = {
  runTests: function(){
    tests_running = tests.length;
    tests.forEach(function(currentValue, index, array){
      currentValue.run( function(){
        if(arguments[0] == true) {
          this.testRunnerView.updateTest("Passed", index);
          tests_passed += 1;
        } else {
          this.testRunnerView.updateTest("Failed", index);
          tests_failed += 1;
        }
        tests_completed += 1;
        tests_running -= 1;
        this.testRunnerView.updateStat("passed", tests_passed);
        this.testRunnerView.updateStat("failed", tests_failed);
        this.testRunnerView.updateStat("running", tests_running);
        this.testRunnerView.updateStat("completed", tests_completed);
        if (tests_completed === tests.length) {
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

