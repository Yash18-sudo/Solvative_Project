let remove = document.querySelector(".delete");
let history = document.querySelector(".history");
var input = document.getElementById("display");
document.querySelector(".equal").addEventListener("click", calculate);


function calculate(){
  let data = display.value;
  let result = evaluateExpression(data);

  if (result !== undefined) {
    let expression = data + " = " + result;

    if (/[\+\-\*\/]/.test(data)) {
      let para = document.createElement("p");
      para.innerText = expression;
      history.appendChild(para);
      storeHistory();
    }

    display.value = result;

    console.log("Here");
  }
}


function evaluateExpression(expression) {
  try {
    
    let regex = /(\-?\d*\.?\d+)([+\-*\/])(\-?\d*\.?\d+)/;

    let match = expression.match(regex);

    if (match) {
      let operand1 = parseFloat(match[1]);
      let operator = match[2];
      let operand2 = parseFloat(match[3]);

      let result;
      switch (operator) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "*":
          result = operand1 * operand2;
          break;
        case "/":
          if (operand2 !== 0) {
            result = operand1 / operand2;
          } else {
            throw new Error("Division by zero error!");
          }
          break;
        default:
          throw new Error("Invalid operator!");
      }

      let newExpression = expression.replace(match[0], result);

      return evaluateExpression(newExpression);
    } else {
      return parseFloat(expression);
    }
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return undefined;
  }
}

function storeHistory() {
  
  let historyParagraphs = history.querySelectorAll("p");

  let serializedHistory = [];
  historyParagraphs.forEach(function (paragraph) {
    serializedHistory.push(paragraph.innerHTML);
  });

  localStorage.setItem("calculationHistory", JSON.stringify(serializedHistory));
}


function loadHistoryFromStorage() {

  let serializedHistory = localStorage.getItem("calculationHistory");
  console.log(serializedHistory);
  if (serializedHistory) {

    let historyParagraphs = JSON.parse(serializedHistory);
    historyParagraphs.forEach(function (paragraphHTML) {
      let para = document.createElement("p");
      para.innerHTML = paragraphHTML;
      history.appendChild(para);
    });
  }
}



function removeHistory(){
  var paragraphs = document.querySelectorAll(".history p");
  paragraphs.forEach(function (paragraph) {
    paragraph.remove();
  });

  localStorage.removeItem("calculationHistory");
}

var selected = document.getElementById("display");
selected.focus();
// selected.select();



function toggleHistory() {
  console.log("Hamburger clicked");
  history.classList.toggle("active");
}


function clearLastNumber() {
  var currentValue = display.value;
  var parts = currentValue.split(/[\+\-\*\/]/);

  
  parts = parts.filter((part) => part !== "");

  
  if (parts.length > 1) {
    var lastNumber = parts.pop();
    var index = currentValue.lastIndexOf(lastNumber);
    display.value = currentValue.substring(0, index);
  } else {
    
    display.value = "";
  }
}


loadHistoryFromStorage();