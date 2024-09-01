import $ from "jquery";

// Hide menues after clicking outside
document.addEventListener("mouseup", function (event: MouseEvent) {
  const inputTarget = event.target as HTMLInputElement;

  // Hide header profile dropdown menu
  if (!inputTarget.id.includes("header-profile")) {
    $(`#header-profile-menu`).removeClass("hidden").addClass("hidden");
  }

  // Hide table row menus
  if (
    !(
      inputTarget.id.includes("menu-button") ||
      inputTarget.id.includes("menu-td")
    )
  ) {
    if (!inputTarget.id.includes("menu-item")) {
      $(".row-menues").map((id) =>
        $(`#row-menu-${id}`).removeClass("hidden").addClass("hidden")
      );
    }
  }

  // Hide search dropdowns
  if (
    !(
      inputTarget.id.includes("dropDownInput") ||
      inputTarget.id.includes("inputDropDown")
    )
  ) {
    $("[name='inputDropDown']").removeClass("hidden").addClass("hidden");
  }

  if (inputTarget.id.includes("dropDownInput")) {
    Object.keys($("[name='inputDropDown']"))
      .splice(0, Object.keys($("[name='inputDropDown']")).length - 2)
      .map((i: string) => {
        const elementName = $("[name='inputDropDown']")[parseInt(i)].id.split(
          "-"
        )[1];
        if (elementName != inputTarget.name)
          $(`#inputDropDown-${elementName}`)
            .removeClass("hidden")
            .addClass("hidden");
      });
  }

  if (
    !(
      inputTarget.name == "mainMenuItem" ||
      inputTarget.name == "mainMenuMobileButton" ||
      inputTarget.getAttribute("name") == "mainMenuMobileButton"
    )
  ) {
    $("#mobile-menu-2").removeClass("hidden").addClass("hidden");
  }
});
