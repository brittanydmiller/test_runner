// function generateDummyTest() {
//   var delay = 1000 + Math.random() * 2000;
//   var testPassed = Math.random() > 0.5;

//   return function(callback) {
//     setTimeout(function() {
//       callback(testPassed);
//     }, delay);
//   };
// }

var tests = [
  { description: "commas are rotated properly",          run: generateDummyTest() },
  { description: "exclamation points stand up straight", run: generateDummyTest() },
  { description: "run-on sentences don't run forever",   run: generateDummyTest() },
  { description: "question marks curl down, not up",     run: generateDummyTest() },
  { description: "semicolons are adequately waterproof", run: generateDummyTest() },
  { description: "capital letters can do yoga",          run: generateDummyTest() }
];

function runTests(){
  for ( test in tests ) {
    // console.log(test);
    // console.log(tests);
    // tests[test].run( function(){
    //     console.log(arguments[0])
    //   });
    var myTest = new Test(tests[test]);
    myTest.run( function(){
      this.render;
    })
  }
}

function Test(test){
  this.status = "Not Started Yet";
  this.description = test.description;
};

Test.prototype = {
  constructor: Test,

  run: function(){ this.generateDummyTest() },
  render: function(){
    console.log(arguments[0]); 
  },
  generateDummyTest: function() {
    var delay = 1000 + Math.random() * 2000;
    var testPassed = Math.random() > 0.5;

    return function(callback) {
      setTimeout(function() {
        callback(testPassed);
      }, delay);
  };
}
}

window.onload = function(){
  document.getElementById("js-test-runner").addEventListener("click", runTests);
}

