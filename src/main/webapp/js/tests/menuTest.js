define([ "menu", "hasher" ], function(menu, hasher) {

  describe("Menu", function() {

    it("has three menu items", function() {
      expect(menu.folders().length).toBe(3);
    });

    it("has first item named 'Schiffstypen'", function() {
      expect(menu.folders()[0].name()).toBe("Schiffstypen");
    });

    it("can be switched to English", function() {
      // when
      runs(function() {
        menu.language("en");
      });

      // then
      waitsFor(function() {
        return menu.folders()[0].name() == "Vessels";
      }, "translation to change to 'Vessels'", 750);
    });

    afterEach(function() {
      if (menu.language() != "de") {
        menu.language("de");
      }
    });

    describe("Link Interaction", function() {

      beforeEach(function() {
        // reset to start hash
        hasher.setHash("");
      });

      it("knowns the active entry", function() {
        // given
        var firstEntry = menu.folders()[0];
        var secondEntry = menu.folders()[1];
        expect(menu.isCurrentSubfolder(firstEntry.link)).toBe(false);

        // when
        hasher.setHash("vessel/main");

        // then
        expect(menu.isCurrentSubfolder(firstEntry.link)).toBeTruthy();
        expect(menu.isCurrentSubfolder(secondEntry.link)).toBeFalsy();
      });

      afterEach(function() {
        // reset to start hash
        hasher.setHash("");
      });

    });

  });

});
