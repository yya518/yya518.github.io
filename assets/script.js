$(document).ready(function() {
  // Function to show all papers
  function showAll() {
    $(".business, .nlp").show();
    $(".working").hide();
  }

  // Function to show journal papers only
  function showBusiness() {
    $(".business").show();
    $(".nlp").hide();
    $(".working").hide();
  }

  // Function to show conference papers only
  function showNLP() {
    $(".business").hide();
    $(".nlp").show();
    $(".working").hide();
  }

  // Function to show working papers only
  function showWorking() {
    $(".business").hide();
    $(".nlp").hide();
    $(".working").show();
  }

  // Event listeners for the tabs
  $("#all").click(function() {
    showAll();
    $(".active").removeClass("active");
    $(this).addClass("active");
  });

  $("#business").click(function() {
    showBusiness();
    $(".active").removeClass("active");
    $(this).addClass("active");
  });

  $("#nlp").click(function() {
    showNLP();
    $(".active").removeClass("active");
    $(this).addClass("active");
  });

  $("#working").click(function() {
      showWorking();
      $(".active").removeClass("active");
      $(this).addClass("active");
    });

  // Initialize by showing all papers and setting "All" button as active
  showAll();
  $("#all").addClass("active");
});
