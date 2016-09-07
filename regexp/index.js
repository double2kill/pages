var _click = document.getElementById('click');
var _input = document.getElementById('input');
var _output = document.getElementById('output');
var a = 450;

var tryEval = function(text){
  try
  {
    var re = eval(text);
    return re;
  }
  catch(err){
    return err;
  }
}

_click.addEventListener("click", function(){
  var result = tryEval(_input.value);
  _output.innerHTML = result;
})
