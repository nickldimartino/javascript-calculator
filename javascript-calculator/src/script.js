import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
import React from 'https://esm.sh/react@18.2.0'

// Functional Component App to carry out the calculator functions

// If this were a class component, "class App extends React.Component" would be used, the class would have it's own state,
// and lifecycle hooks such as "componentWillUnmount()" could be used
function App() {
  // Since this is a functional component, useState() must be used to give it state. Here,
  // a display variable is set to "" which can be modified by the setDisplay() method.
  // Conversely for class components, this.state = { display: "" } and this.setState({display: [CHANGED VALUE]})
  const [display, setDisplay] = React.useState("");
  
  // Updates the display with the user input
  // As of ES6, arrow functions (as opposed to regular functions) can be used to be more precise, have implicit returns, 
  // and avoid the binding method
  const updateDisplay = (userInput) => {
    const opsRegex = /[+\-*/]/;   // REGEX value for the four operators
    
    // if the display is empty and the user inputs a 0, don't add the zero and return
    // there is no need to add a zero before numbers
    if (display === "" && userInput === "0") {
      return;
    }
    
    // if the user inputs a decimal, determine if the last inputted value is a decimal. If
    // it is, then don't add a consecutive decimal
    if (userInput === ".") {
      const operands = display.split(opsRegex);  // splits the display into the two operands
      
      // checks the last entered value of each operand for a decimal
      if (operands[operands.length - 1].includes(".")) {
        return;
      }
    }
    
    // Handling the subtract vs negative value
    // if the user input is not a - and the value entered is an operator
    if (userInput !== "-" && opsRegex.test(userInput)) {
      // save the last entered value and the second to last entered value (or empty string)
      const lastVal = display[display.length - 1] || "";
      const nextLastVal = display[display.length - 2] || "";
      
      // if the last entered value is an operator
      if (opsRegex.test(lastVal)) {
        // if the last entered value is the - sign and the second to last value is an operator
        if (lastVal === "-" && opsRegex.test(nextLastVal)) {
          // replace the second to last operator with the minus sign
          setDisplay(display.slice(0, -2) + userInput);
          return;
        }
        // replace the last operator with the minus sign
        setDisplay(display.slice(0, -1) + userInput);
        return;
      }
    }
    // add the operator to the current display
    setDisplay(display + userInput);
  };
  
  // evaluate the display equation and set it to a string
  const equals = () => {
    setDisplay(eval(display).toString());
  };
 
  // clear the display
  const clear = () => {
    setDisplay("");
  };
  
  // Return the singular element containing the calculator HTML
  // The display element is set to the display entered or a 0 if nothing is entered.
  // The onClick handlers call inline functions for their respective actions (ie clear, equals, updateDisplay). This is done
  // so that the functions are rendered on creation and so that values can be passed in the event
  return (
    <div id="calculator">
      <div id="display">{display || "0"}</div>
      <div id="first-row">
        <div className="button clear" id="clear" onClick={clear}>AC</div>
        <div className="button equals" id="equals" onClick={equals}>=</div>
      </div>
      <div id="second-row">
        <div className="button" id="seven" onClick={() => {updateDisplay("7");}}>7</div>
        <div className="button" id="eight" onClick={() => {updateDisplay("8");}}>8</div>
        <div className="button" id="nine" onClick={() => {updateDisplay("9");}}>9</div>
        <div className="button" id="add" onClick={() => {updateDisplay("+");}}>+</div>
      </div>
      <div id="third-row">
        <div className="button" id="four" onClick={() => {updateDisplay("4");}}>4</div>
        <div className="button" id="five" onClick={() => {updateDisplay("5");}}>5</div>
        <div className="button" id="six" onClick={() => {updateDisplay("6");}}>6</div>
        <div className="button" id="subtract" onClick={() => {updateDisplay("-");}}>-</div>
      </div>
      <div id="fourth-row">
        <div className="button" id="one" onClick={() => {updateDisplay("1");}}>1</div>
        <div className="button" id="two" onClick={() => {updateDisplay("2");}}>2</div>
        <div className="button" id="three" onClick={() => {updateDisplay("3");}}>3</div>
        <div className="button" id="multiply" onClick={() => {updateDisplay("*");}}>*</div>
      </div>
      <div id="fifth-row">
        <div className="button" id="zero" onClick={() => {updateDisplay("0");}}>0</div>
        <div className="button" id="decimal" onClick={() => {updateDisplay(".");}}>.</div>
        <div className="button" id="divide" onClick={() => {updateDisplay("/");}}>/</div>
      </div>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("app"));