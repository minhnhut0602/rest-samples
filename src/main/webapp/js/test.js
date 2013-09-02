define([ 'knockout', 'jquery' ], function(ko, $) {

  return function() {
    // START SNIPPET: jasminebasic4
    if (location.search.indexOf('?spec=') != -1) {
      // END SNIPPET: jasminebasic4

      // START SNIPPET: jasminebasic1
      require([ "jasmine", "jasmine-html", "sinon", "jasmine-junit" ],
          function(jasmine) {

            // disable all animations for jquery; this makes tests run even faster
            $.fx.off = true;

            // dynamically add CSS to the page
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = "css/jasmine.css";
            document.getElementsByTagName("head")[0].appendChild(link);

            // setup Jasmine environment
            var jasmineEnv = jasmine.getEnv();
            jasmineEnv.updateInterval = 1000;

            // create a "reporter" that will display the test results within the
            // page
            var reporter = new jasmine.TrivialReporter();
            jasmineEnv.addReporter(reporter);

            jasmineEnv.specFilter = function(spec) {
              return reporter.specFilter(spec);
            };

            jasmineEnv.addReporter(new jasmine.JUnitXmlReporter());

            // END SNIPPET: jasminebasic1

            // START SNIPPET: jasminesinon1

            // we will be faking only REST calls; call loading of resources
            // should still pass
            sinon.FakeXMLHttpRequest.useFilters = true;
            sinon.FakeXMLHttpRequest.addFilter(function(method, url, async,
                username, password) {
              if (/^rest\//.test(url)) {
                return false;
              }
              return true;
            });

            // sinon should log to the console.
            sinon.log = function(data) {
              // console.log(data);
            };

            // END SNIPPET: jasminesinon1

            /*
             * this seems to be a bug in !text -> only works here with relative
             * path we need to require these, so they are available later.
             */
            // START SNIPPET: jasminebasic2
            if (location.href.indexOf('test.html') != -1) {
              // if this has been loaded on test.html, only run unit tests
              require([ "tests/menuTest" ], function() {
                // alert('connect debugger');
                jasmineEnv.execute();
              });
            } else {
              // otherwise load gui tests
              require([
              // tests with mocked backend
              "modules/tests/vesselTest", "modules/tests/sightingTest",
                  "modules/tests/timezoneTest" // add '0' for tests with real backend - for demo purposes
              ], function() {
                // alert('connect debugger');
                jasmineEnv.execute();
              });
            }
            // END SNIPPET: jasminebasic2

            // clear

            // jasmine.currentEnv_ = null;
            // $('#TrivialReporter').remove();

            // jasmineEnv.execute();
          });

    }
  };
});