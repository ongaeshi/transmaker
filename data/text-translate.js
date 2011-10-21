$(function() {
  $("#translate-button").click(function(){
    self.postMessage($("#src > textarea").val());
  });
});
