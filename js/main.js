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

var tests_passed = 0;
var tests_failed = 0;
var tests_running = 0;
var tests_completed = 0;

function runTests(){
  tests_running = tests.length;
  tests.forEach(function(currentValue, index, array){
    currentValue.run( function(){
        if(arguments[0] == true) {
          updateTest("Passed", index);
          tests_passed += 1;
        } else {
          updateTest("Failed", index);
          tests_failed += 1;
        }
          tests_completed += 1;
          tests_running -= 1;
          updateStat("passed", tests_passed);
          updateStat("failed", tests_failed);
          updateStat("running", tests_running);
          updateStat("completed", tests_completed);
          if (tests_completed === tests.length) {
            sayDone();
          }
      });
  }, this);
}

function updateStat(stat, stat_value){
  document.getElementById(stat).innerText = stat_value;
}

function updateTest(text, index){
  var status = document.getElementById("status" + index);
  status.innerText = text;
}

function sayDone(){
  var final_message = document.createElement("h2");
  final_message.innerText = "All Tests Completed!"
  document.getElementById("js-stats").appendChild(final_message);
};


function loadTests(){
  var container = document.getElementById("js-test-container")
  var html = "";
  for ( test in tests ) {
    html = html + "<div><h2>Test " + test + "</h2><h3>Status: <span id=\"status"+ test +"\">Not Started Yet</span></h3><p>" + tests[test]["description"] + "<p></div>";
  }
  container.innerHTML = html;
}


window.onload = function(){
  document.getElementById("js-test-runner").addEventListener("click", runTests);
  loadTests();
}

