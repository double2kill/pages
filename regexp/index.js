var _input = document.getElementById('input');
var _output = document.getElementById('output');
var _inputWrap = document.getElementById('input-wrap');
var _history = document.getElementById('history');

// 复制eval为myeval,免得覆盖默认方法。
var myeval = eval;
// 重写console.log
var logData = [];
logdefault = console.log;
console.log = function(text){
  logdefault(text);
  logData.push(text);
}

// 修改默认的console.log.

var string2html = function(string){
  var _html = string.replace(/\n/g,'<br>');
  _html = _html.replace(/\s/g,'&nbsp;')
  return _html;
}

var tryEval = function(text){
  try
  {
    logData = []; // 全局变量。
    var re = myeval(text) || 'undefined or null'; // 如果是undefined,
    if(logData.length !== 0){
      re = logData.join('\n') + '\n' + re;
    }
    
    return re.toString();
  }
  catch(err){
    return err.toString();
  }
}

_input.addEventListener("keydown", function(e){
  var theEvent = e || window.event;    
  var code = theEvent.keyCode || theEvent.which || theEvent.charCode; 

  var update = function(_this, e, text, jump){
    var t = text || '';
    var j = jump || 1;
    var start = _this.selectionStart;
    var end = _this.selectionEnd;
    var target = e.target;
    var value = target.value;
    target.value = value.substring(0, start)
              + t
              + value.substring(end);
    _this.selectionStart = _this.selectionEnd = start + j;
  }

  // 输入Ctrl+Enter，表示运行
  if(e.ctrlKey && code == 13){
    e.preventDefault();
    var result = tryEval(_input.value);
    var inputText = _input.value.toString();
    _history.innerHTML += "<div class='history-box'>"
                       + "<div class='box-title'>" + string2html(inputText) +"</div>"
                       + "<div class='box-content'>" + string2html(result) +"</div>"
                       + "</div>"
    _input.value = '';
  }
  // 输入Tab，表示制表符
  if(code == 9){
    e.preventDefault();
    update(this, e, "  ", 2);
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