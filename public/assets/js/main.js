$(function () {
  "use strict";

  $(".sidebar-close").on("click", function () {
    $("body").removeClass("toggled");
  });

  $(".dark-mode span").click(function () {
    $(this).text(function (i, v) {
      return v === "dark_mode" ? "light_mode" : "dark_mode";
    });
  });

  $(function () {
    $("#menu").metisMenu();
  });

  $(document).ready(function () {
    $(".btn-toggle-menu").on("click touchstart", function (e) {
      e.preventDefault(); // dokunmayı engelleyen durumları önle

      const body = $("body");

      if (body.hasClass("toggled")) {
        body.removeClass("toggled sidebar-hovered");
        $(".sidebar-wrapper").off("mouseenter mouseleave");
      } else {
        body.addClass("toggled");

        // Masaüstü cihazlarda hover olayı bağla
        if (window.innerWidth > 768) {
          $(".sidebar-wrapper")
            .on("mouseenter", function () {
              body.addClass("sidebar-hovered");
            })
            .on("mouseleave", function () {
              body.removeClass("sidebar-hovered");
            });
        }
      }
    });
  });

  $(function () {
    for (
      var e = window.location,
        o = $(".sidebar-wrapper .metismenu li a")
          .filter(function () {
            return this.href == e;
          })
          .addClass("")
          .parent()
          .addClass("mm-active");
      o.is("li");

    )
      o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
  }),
    // email

    $(".email-toggle-btn").on("click", function () {
      $(".email-wrapper").toggleClass("email-toggled");
    }),
    $(".email-toggle-btn-mobile").on("click", function () {
      $(".email-wrapper").removeClass("email-toggled");
    }),
    $(".compose-mail-btn").on("click", function () {
      $(".compose-mail-popup").show();
    }),
    $(".compose-mail-close").on("click", function () {
      $(".compose-mail-popup").hide();
    });

  // chat

  $(".chat-toggle-btn").on("click", function () {
    $(".chat-wrapper").toggleClass("chat-toggled");
  }),
    $(".chat-toggle-btn-mobile").on("click", function () {
      $(".chat-wrapper").removeClass("chat-toggled");
    });

  // switcher

  $("#LightTheme").on("click", function () {
    $("html").attr("data-bs-theme", "light");
  }),
    $("#DarkTheme").on("click", function () {
      $("html").attr("data-bs-theme", "dark");
    }),
    $("#SemiDarkTheme").on("click", function () {
      $("html").attr("data-bs-theme", "semi-dark");
    }),
    $("#MinimalTheme").on("click", function () {
      $("html").attr("data-bs-theme", "minimal-theme");
    });

  $("#ShadowTheme").on("click", function () {
    $("html").attr("data-bs-theme", "shadow-theme");
  });

  $(".dark-mode").click(function () {
    $("html").attr("data-bs-theme", function (i, v) {
      return v === "dark" ? "light1" : "dark";
    });
  });
});
