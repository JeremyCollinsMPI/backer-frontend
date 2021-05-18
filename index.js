import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.ip = "http://103.102.44.216";
    this.state = {
     stepNumbers: [0],
     currentStepNumber: 0,
     functions: ['undefined'],
     inputs: [{'type': 'undefined'}],
     additionalInputs: [{'type': 'undefined'}],
     r: {'result': []},
     id: 123,
     in_progress: false
     };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputDropdownChange = this.handleInputDropdownChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this); 
    this.handleAdditionalInputChange = this.handleAdditionalInputChange.bind(this);
  }
  
  addStep() {
  const currentStepNumber = this.state.currentStepNumber + 1;
  this.setState({
    stepNumbers: this.state.stepNumbers.concat(currentStepNumber),
    currentStepNumber: currentStepNumber,
    inputs: this.state.inputs.concat({'type': 'undefined'}),
    additionalInputs: this.state.additionalInputs.concat({'type': 'undefined'})
  })
  }
  
  handleDropdownChange(e) {
    const index = e.target.id;
    const functions = this.state.functions;
    functions[index] = e.target.value;
    this.setState({ functions: functions });
    let url = this.ip + ":8080/wake_up_gcp";
    axios.get(url);
  }

  handleInputDropdownChange(e) {
    const index = e.target.id;
    const inputs = this.state.inputs;
    inputs[index]['name'] = e.target.value;
    if (inputs[index]['name'] === 'file or directory') {
      inputs[index]['type'] = 'file or directory'
    }
    if (inputs[index]['name'].includes('Output')) {
      inputs[index]['type'] = 'Output';
      inputs[index]['index'] = inputs[index]['name'].replace('Output ', '');
      inputs[index]['index'] = parseInt(inputs[index]['index']) - 1;
    }    
    this.setState({ inputs: inputs });
  }

  onFileChange = event => { 
      var inputs = this.state.inputs;
      const index = event.target.id;
      inputs[index]['file'] = event.target.files[0];
      this.setState({ 
      inputs: inputs});     
    };

  handleAdditionalInputChange(e) {
    const index = e.target.id;
    var additionalInputs = this.state.additionalInputs;
    const value = e.target.value;
    additionalInputs[index] = {'type': 'text', 'text': value};
    this.setState({additionalInputs: additionalInputs});
  }


  makeAdditionalInputs(index) {
  console.log(this.state.functions[index])
  let example_array = ["Find sentences with string", "Semantic search"];
  console.log(example_array);
  console.log(example_array.includes(this.state.functions[index]));
  if(this.state.functions[index] == "Get sentences from CSV"){
    return(<div className="l">Column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Entails"){
    return(<div className="l">Hypothesis:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }  
  if(this.state.functions[index] == "Get sentences from url"){
    return(<div className="l">Url:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }  
  if(this.state.functions[index] == "Ask question"){
    return(<div className="l">Question:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }  
  if (example_array.includes(this.state.functions[index])){
    return(<div className="l"><input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
    } else {
    return(<div className="k"></div>)
  }
  }
  
  showFileUploadButton(index) {
  if (this.state.inputs[index]['type'] == 'file or directory'){
  return(  <form className = "l">
  <input type="file" id={index} onChange={this.onFileChange}></input>
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
    <option value="file or directory">Upload file or directory</option>
    <option value="Output 1">Output 1</option>
    <option value="Output 2">Output 2</option>
  </select>  
       </div>      
       )
    } 

  async submitFile(index) {
  const data = new FormData()
  data.append('file', this.state.inputs[index]['file'])
  let id = this.state.id;
  let step = index;
  let url = this.ip + ":8080/accept_file?id=" + id + "&step=" + index;
  await axios.post(url, data);
    
  }

  async submitFiles() {
    var i;
    for (i = 0; i < this.state.inputs.length; i++) {
      if(this.state.inputs[i].type == 'file or directory'){
        await this.submitFile(i);
      }
    }
  }
 
  async submitSteps() {
    let data = {'state': this.state}
    let url = this.ip + ":8080/accept_steps?id=" + this.state.id;
       await axios.post(url, data).then((response) => {
  console.log(response);
  }, (error) => {
  console.log(error);
  });
  }
    
  async submitRun() {
  let url = this.ip + ":8080/run?id=" + this.state.id;
  await axios.get(url).then(response => {this.setState({"r": response.data})}); 
  }
  
  async submit() {
  this.setState({"in_progress": true});
  this.setState({"r": {'result': []}});
  let x = await this.submitSteps();
  console.log(x);
  let y = await this.submitFiles();
  console.log(y);
  let z = await this.submitRun();
  this.setState({"in_progress": false});
  }
  
  render() {
    const stepNumbers = this.state.stepNumbers;  
    const steps = stepNumbers.map(thing => {
      const outputName = 'output ' + (thing + 1); 
      const index = thing;
      const additionalInputs = this.makeAdditionalInputs(index);
      const inputDropdownMenu = this.makeInputDropdownMenu(thing);
      const fileUploadButton = this.showFileUploadButton(index);
      var x = this.state.inputs[0]['type'];
      return (
<div className="h">
       {inputDropdownMenu}
       <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange}>
    <option value="Choose function">Choose function</option>
    <option value="Get sentences from CSV">Get sentences from CSV</option>
    <option value="Semantic search">Semantic search</option>
    <option value="Find relevant sentence">Find relevant sentence</option>
    <option value="Word document to text file">Word document to text file</option>
    <option value="Text file to sentences">Text file to sentences</option>
    <option value="Find sentences with string">Find sentences with string</option>
    <option value="Entails">Entails</option>
    <option value="Get sentences from url">Get sentences from url</option>
    <option value="Ask question">Ask question</option>
  </select>  

         <div className="p">{outputName}</div> 
</div>
       {fileUploadButton}
       {additionalInputs}
</div>
      );
    });
    console.log(this.state.additionalInputs);
    const resultList = this.state.r.result;
    let resultHeader = '';
    if(resultList.length > 0){
      resultHeader = 'Result:'
    }
    let inProgressHeader = '';
    if (this.state.in_progress){
      inProgressHeader = "In progress";
    }
    const result = resultList.map(thing => {
    return (
    <div>{thing}</div>    
    );
    }
    );
    return (
<div>
    <div>
     <button onClick={() => this.addStep()}>Add step</button>
      {steps}
      <button className="n" onClick={() => this.submit()}>Submit</button>
      </div>
<div className="i">
<p>Click on the "Add step" button to add steps</p>
</div>
<p>{inProgressHeader}</p>
<p>{resultHeader}</p>
<div className="i">
<p>{result}</p>
</div>
</div>
    );
  }
}

// ========================================

ReactDOM.render(<Steps />, document.getElementById("root"));


