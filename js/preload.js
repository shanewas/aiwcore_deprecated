const electron = require("electron");
const path = require("path");
const url = require("url");

let path_ = path.join(__dirname, "inject.js");

window.onload = function() {
  var x = document.getElementsByTagName("BODY")[0];
  x.className = "main"
//   x.addEventListener("click", addclick);
  let div = document.createElement("div");

  div.className = "document";
  div.innerHTML = '<div onclick="addclick()"></div>';

  document.body.append(div);
  //   document.body.style.backgroundColor = "red";
  //   // console.log(x)
  //   var seq = [];
};
function addclick() {
//   var target = event.target;
//   seq.push(target.id);
  console.log("pushed");
}

function callMe() {
  var frame = $("iframe"),
    contents = frame.contents(),
    body = contents.find("body");

  var script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.text = " console.log('Potato')";
  $(body).append(script2);
}

// function codegeneretor(xpaths, seq) {
//   code = "";
//   xpaths.forEach(function(item, index) {
//     var line =
//       seq[index] +
//       '= driver.find_element_by_xpath("' +
//       item +
//       '")\n' +
//       "element.click()\n";

//     code += line;
//   });
//   return code;
// }
