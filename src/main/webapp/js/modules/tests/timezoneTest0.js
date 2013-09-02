define([ "hasher", "knockout", "jasmine-jquery", ], function(hasher, ko) {
  describe("Manage Timezones Real Backend", function() {

    beforeEach(function() {

      runs(function() {

        // to go the main page
        hasher.setHash("");

        // expect the main page to be shown
        expect($("#welcome")).toBeVisible();

        // go to this use case
        hasher.setHash("timezone/main");

      });

      waitsFor(function() {
        return $("#timezoneList").is(":visible");
      }, "the list should appear", 750);

      waitsFor(function() {
        return $("#timezoneList > tbody > tr").length == 1;
      }, "the list should be filled", 750);

    });

    it("shows a list of two timezones at the start",
        function() {

          expect($("#timezoneList")).toBeVisible();
          expect($("#timezoneList > tbody > tr")[0]).toContainHtml(
              "Europe/Berlin");

        });

    it("has the first menu item highlighted at the start", function() {

      expect($("#subfolder0")).toHaveClass('active');

    });

    describe("timezone edit", function() {

      beforeEach(function() {

        expect($("#timezoneList > tbody > tr").length).toBe(1);

        expect($("a[name=edit]").length).toBe(1);

        $("a[name=edit]").first().click();

        waitsFor(function() {
          return $("#timezoneName").is(":visible");
        }, "the time zone name should appear", 5000);

      });

      it("show a timezone on editing", function() {

        expect($("#timezoneName")).toBeVisible();
        expect($("#timezoneName")).toHaveValue("Europe/Berlin");

      });

      it("returns on save to the list", function() {

        expect($("#save")).toBeVisible();

        $("#save").click();

        waitsFor(function() {
          return $("#timezoneList > tbody > tr").length == 1;
        }, "the list didn't appear", 5000);

      });

    });
  });
});
