var _input = document.getElementById('input');
var _output = document.getElementById('output');
var _inputWrap = document.getElementById('input-wrap');
var _history = document.getElementById('history');

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

_input.addEventListener("keydown", function(e){
  var theEvent = e || window.event;    
  var code = theEvent.keyCode || theEvent.which || theEvent.charCode; 

  var update = function(_this, e, text = '', jump = 1){
    var start = _this.selectionStart;
    var end = _this.selectionEnd;
    var target = e.target;
    var value = target.value;
    target.value = value.substring(0, start)
              + text
              + value.substring(end);
    _this.selectionStart = _this.selectionEnd = start + jump;
  }

  // 只输入Enter，表示运行
  if(!e.ctrlKey && code == 13){
    e.preventDefault();
    var result = tryEval(_input.value);
    _history.innerHTML += _input.value + '\n';
    _history.innerHTML += result + '\n';
    _input.value = '';
  }
  // 输入Tab，表示制表符
  if(code == 9){
    e.preventDefault();
    update(this, e, "  ", 2);
  }
  // 输入Ctrl+Enter，表示回车
  if (e.ctrlKey && code == 13) {
    e.preventDefault();
    update(this, e, "\n");
  }
  if (e.shiftKey && code == 57) {
    e.preventDefault();
    update(this, e, "()");
  }
  if (!e.shiftKey && code == 219) {
    e.preventDefault();
    update(this, e, "[]");
  }
  if (e.shiftKey && code == 219) {
    e.preventDefault();
    update(this, e, "{}");
  }
  if (e.shiftKey && code == 188) {
    e.preventDefault();
    update(this, e, "<>");
  }
  if (!e.shiftKey && code == 222) {
    e.preventDefault();
    update(this, e, "''");
  }
  if (e.shiftKey && code == 222) {
    e.preventDefault();
    update(this, e, "\"\"");
  }
})

_input.onfocus = function(){
  _inputWrap.style.borderColor = "#4791ff";
}

_input.onblur = function(){
  _inputWrap.style.borderColor = "#b6b6b6";
}