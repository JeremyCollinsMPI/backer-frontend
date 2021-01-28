import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     moose: [1, 2],
     currentStepNumber: 2,
     functions: ['mate', 'mate']
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  
  addStep() {
  const currentStepNumber = this.state.currentStepNumber + 1;
  this.setState({
    moose: this.state.moose.concat(currentStepNumber),
    currentStepNumber: currentStepNumber
  })
  }
  
  handleDropdownChange(e) {
    const index = e.target.id - 1;
    const functions = this.state.functions;
    functions[index] = e.target.value;
    this.setState({ functions: functions });
  }

  makeInputs(thing) {
    const index = thing - 1;
    const functionName = this.state.functions[index];
    const inputs = '';
    if (functionName == "Find relevant sentence") {
    return(<div> <form className = "g" action="/action_page.php">
  <input type="file" id="myFile" name="filename"></input>
</form><div>matey</div></div>) 
    } else {
    return( <form className = "f" action="/action_page.php">
  <input type="file" id="myFile" name="filename"></input>
</form>)
    }
  }

  makeAdditionalInputs() {
  return(<div className="j">matey</div>)
  }
  
  render() {
    const moose = this.state.moose;

    
    
    const steps = moose.map(thing => {
      const desc = 'Choose function';
      const outputName = 'output ' + thing; 
      const index = thing - 1;
      const additionalInputs = this.makeAdditionalInputs();
      return (
<div className="h">
<form className = "f" action="/action_page.php">
  <input type="file" id="myFile" name="filename"></input>
</form>

 
      
       <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange}>
    <option value="Choose function">Choose function</option>
    <option value="Find relevant sentence">Find relevant sentence</option>
    <option value="Word document to text file">Word document to text file</option>
    <option value="Text file to sentence">Text file to sentence</option>
  </select>  
       </div>
         <div className="f">{outputName}</div> 
         {additionalInputs}
</div>


      );
    });
    return (
<div>
    <div>
     <button onClick={() => this.addStep()}>Add step</button>
      {steps}
      
      </div>
<div className="i">
<p>Click on the "Add step" button to add steps</p>
</div>
</div>
    );
  }
}

// ========================================

ReactDOM.render(<Steps />, document.getElementById("root"));


