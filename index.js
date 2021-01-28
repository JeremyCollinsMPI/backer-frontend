import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     moose: [1],
     currentStepNumber: 1,
     functions: ['mate'],
     inputs: ['mate'],
     additionalInputs: ['mate']
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputDropdownChange = this.handleInputDropdownChange.bind(this);

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

  handleInputDropdownChange(e) {
    const index = e.target.id - 1;
    const inputs = this.state.inputs;
    inputs[index] = e.target.value;
    this.setState({ inputs: inputs });

  }

onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
     
    };

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
  

  
  showFileUploadButton(index) {
  if (this.state.inputs[index] == 'Upload file or directory'){
  return(  <form className = "l">
  <input type="file" onChange={this.onFileChange}></input>
  </form>
  
  
  
  
  
  )  
  } else {
  return (<div className="k"></div>)
  }  
  }
  
  makeInputDropdownMenu(thing) {
  
  return(
         <div className="f">   <select name="input" id={thing} onChange={this.handleInputDropdownChange}>
    <option value="Choose input">Choose input</option>
    <option value="Upload file or directory">Upload file or directory</option>
    <option value="Output 1">Output 1</option>
  </select>  
       </div>      
       )
    }
  
  render() {
    const moose = this.state.moose;  
    const steps = moose.map(thing => {
      const desc = 'Choose function';
      const outputName = 'output ' + thing; 
      const index = thing - 1;
      const additionalInputs = this.makeAdditionalInputs();
      const inputDropdownMenu = this.makeInputDropdownMenu(thing);
      const fileUploadButton = this.showFileUploadButton(index);
      return (
<div className="h">

       {inputDropdownMenu}

       <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange}>
    <option value="Choose function">Choose function</option>
    <option value="Find relevant sentence">Find relevant sentence</option>
    <option value="Word document to text file">Word document to text file</option>
    <option value="Text file to sentence">Text file to sentence</option>
  </select>  
       </div>
         <div className="f">{outputName}</div> 
       {fileUploadButton}
     
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


