import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { useParams } from "react-router-dom";


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

function SaveNameTextInput(props) {
  const [inputValue, setInputValue] = useState('');
  let default_value = inputValue ? inputValue : props.name

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      props.onEnter(inputValue);
//       setInputValue('');
    }
  }

  return (
  <div>
  <p>
  Name of flow:
  </p>
    <input
      type="text"
      value={default_value}
      onChange={(event) => setInputValue(event.target.value)}
      onKeyDown={handleKeyDown}
    />
    </div>
  );
}

function createArray(n) {
  const arr = [];

  for (let i = 0; i <= n; i++) {
    arr.push(i);
  }

  return arr;
}

class Flow extends React.Component {
  
  constructor(props) {
    super(props);
    this.ip = "http://103.102.44.216";

    const name = this.props.params.name;
    if (name){
    console.log('fish');
    this.needToCall = true;
    } 
    
    this.state = {
     stepNumbers: [0],
     currentStepNumber: 0,
     functions: ['undefined'],
     inputs: [{'type': 'undefined'}],
     additionalInputs: [{'type': 'undefined'}],
     r: {'result': []},
     id: 123,
     in_progress: false,
     name: null
     };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputDropdownChange = this.handleInputDropdownChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this); 
    this.handleAdditionalInputChange = this.handleAdditionalInputChange.bind(this);
    this.handleAdditionalInputChangeMore = this.handleAdditionalInputChangeMore.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.showTextInput = this.showTextInput.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }
  
  addStep() {
  const currentStepNumber = this.state.currentStepNumber + 1;
  this.setState({
    stepNumbers: this.state.stepNumbers.concat(currentStepNumber),
    currentStepNumber: currentStepNumber,
    inputs: this.state.inputs.concat({'type': 'Output', 'name': 'Output ' + currentStepNumber.toString(),
      'index': currentStepNumber - 1}),
    additionalInputs: this.state.additionalInputs.concat({'type': 'undefined'})
  });
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
    if (inputs[index]['name'] == 'Api input'){
      inputs[index]['type'] = 'Api input';
    }
    if (inputs[index]['name'] == 'Text input'){
      inputs[index]['type'] = 'Text input';
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

  onTextChange = event => { 
      var inputs = this.state.inputs;
      const index = event.target.id;
      inputs[index]['text'] = event.target.value;
      this.setState({inputs: inputs});    
    };

  handleAdditionalInputChange(e) {
    const index = e.target.id;
    var additionalInputs = this.state.additionalInputs;
    const value = e.target.value;
    additionalInputs[index] = {'type': 'text', 'text': value};
    this.setState({additionalInputs: additionalInputs});
  }

  handleAdditionalInputChangeMore(e) {
    const index = e.target.id;
    var additionalInputs = this.state.additionalInputs;
    const value = e.target.value;
    additionalInputs[index]['more'] = [{'type': 'text', 'text': value}];
    this.setState({additionalInputs: additionalInputs});
  }

  makeAdditionalInputs(index) {
  console.log(this.state.functions[index])
  let example_array = ["Find sentences with string", "Semantic search"];
  console.log(example_array);
  console.log(example_array.includes(this.state.functions[index]));
  if(this.state.functions[index] == "Tesseract OCR from PDF"){
    return(<div className="l">(Optional) Page numbers inclusive, separated by dash:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Split text into sections"){
    return(<div className="l">Number of words per section:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Find most relevant section"){
    return(<div className="l2">Query:<input type="text" size="200" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Submit query about text"){
    return(<div className="l2">Query:<input type="text" size="200" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Get sentences from CSV"){
    return(<div className="l">Column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Get labels"){
    return(
    <div className="l">Label column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Compare with labels"){
    return(
    <div>
    <div className="l">Label output to use:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>
    <div className="l">Text output to use:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore} value={this.state.additionalInputs[index].more[0].text}></input></div>
    </div>)
  }
  if(this.state.functions[index] == "Get intents and examples"){
    return(
    <div>
    <div className="l">Example column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>
    <div className="l">Intent column name:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore} value={this.state.additionalInputs[index].more[0].text}></input></div>
    </div>)
  }
  if(this.state.functions[index] == "Compare two label dicts"){
    return(
    <div>
    <div className="l">Label output number:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>
    <div className="l">Confidence threshold:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore} value={this.state.additionalInputs[index].more[0].text}></input></div>
    </div>)
  }
  if(this.state.functions[index] == "Classify intent"){
    return(<div className="l">Intents and examples input:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }  
  if(this.state.functions[index] == "Entails"){
    return(<div className="l">Hypothesis:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }  
  if(this.state.functions[index] == "Get sentences from url"){
    return(<div className="l">Url:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }  
  if(this.state.functions[index] == "Ask question"){
    return(
    <div>
    <div className="l">Question:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>
    <div className="l">Model [choose from the Models page]:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChangeMore} value={this.state.additionalInputs[index].text}></input></div>
    </div>
    )
  }  
  if(this.state.functions[index] == "Random sample from array"){
    return(<div className="l">Sample size<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }   
  if(this.state.functions[index] == "Union of outputs"){
    return(<div className="l">Outputs:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }
  if(this.state.functions[index] == "Classify intent with array input"){
    return(<div className="l">Intents and examples input:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
  }      
  if(this.state.functions[index] == "Get label dict"){
    return(
    <div>
    <div className="l">Text column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>
    <div className="l">Label column name:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore} value={this.state.additionalInputs[index].more[0].text}>></input></div>
    </div>)
  }
  if (example_array.includes(this.state.functions[index])){
    return(<div className="l"><input type="text" id={index} onChange={this.handleAdditionalInputChange} value={this.state.additionalInputs[index].text}></input></div>)
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
  
  
  showTextInput(index) {
  if (this.state.inputs[index]['type'] == 'Text input')
    {
    return(<form className="l"><input type="text" id={index} onChange={this.onTextChange}></input></form>)
    }  
  else{ return (<div className="k"></div>)
  }
  }
  
  makeInputDropdownMenu(thing) { 
  const array1 = ["Choose input", "file or directory", "Text input", "Api input"]
  let step_numbers = createArray(parseInt(thing) - 1);
  const array2 = step_numbers.map(function(stepNumber){
    return ('Output ' + (stepNumber+1).toString())
  });
  const array3 = array1.concat(array2);
  function mapName(name) {
    if(name=='file or directory'){
    return('Upload file or directory')
    }
    else{
    return(name)
    }
  }
  const array4 = array3.map(function(item){
  return(<option value={item}>{mapName(item)}</option>)
  }
  );
//   console.log('making');
//   console.log(thing);
//   console.log(this.state);
  return(
         <div className="f">   <select name="input" id={thing} onChange={this.handleInputDropdownChange} value={this.state.inputs[thing].name}> 
  {array4}
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
  
  saveFlow() {
//     if (this.state.show_save_name_box) {
//     this.handle
//     }
//     else {
//       
//     }
    this.setState({ show_save_name_box: true }, () => {
    console.log(this.state.show_save_name_box);
  });
    
  }

  handleNameBoxEnter = (inputValue) => {
    let default_value = inputValue ? inputValue : this.state.name;
    console.log('Save flow function called with input value:', default_value);
    let url = this.ip + ":8080/save_flow?name=" + default_value;
    console.log(url);
    let data = this.state;
    axios.post(url, data).then(response => {console.log(response); this.setState({'save_message': 'Saved flow with name ' + default_value})}); 
    
  }

  async callForFlowData(name) {
    let url = this.ip + ":8080/get_flow?name=" + name;
    await axios.get(url).then(response => {this.setState(response.data); this.setState({"name": name})});
    this.needToCall = false;
  }
  
  makeDeleteButton(index){
    return(<button id={index} class="deleteButton" onClick={this.handleDeleteButtonClick}>delete</button>)
  }
  
  handleDeleteButtonClick(e){
    const target = e.target;
    const index = target.id;
    this.removeStep(index);
  }

  removeStep(index){
    let arr = this.state.stepNumbers;
    let i = arr.indexOf(parseInt(index));
    console.log('index');
    console.log(index);
    console.log(i);
    console.log(this.state.stepNumbers);
    if (i > -1) {
    arr.splice(i, 1); 
    for (let j = i; j < arr.length; j++) {
      arr[j] -= 1; 
      }
    }
    
    let inputs = this.state.inputs;
    inputs.splice(i, 1);
    for (let j = i; j < inputs.length; j++) {
      console.log('frog');
      console.log(i);
      console.log(inputs[j]);
      if (inputs[j].type == 'Output'){
        inputs[j].index -= 1 ;
        inputs[j].name = 'Output ' + (inputs[j].index + 1).toString() ;
      }
    }
    let functions = this.state.functions;
    functions.splice(i, 1);
    let additionalInputs = this.state.additionalInputs;
    additionalInputs.splice(i, 1);
    this.setState({"stepNumbers": arr,
      "currentStepNumber": this.state.currentStepNumber - 1,
      "functions": functions,
      "inputs": inputs,
      "additionalInputs": additionalInputs
      })
    }

  render() {
    const name = this.props.params.name;
    console.log('here');
    console.log(this.state);
    console.log(name);
    if (this.needToCall){
      console.log("maatey");
      this.callForFlowData(name);
    }
    const stepNumbers = this.state.stepNumbers;  
    const steps = stepNumbers.map(thing => {
      const outputName = 'output ' + (thing + 1); 
      const index = thing;
      const additionalInputs = this.makeAdditionalInputs(index);
      const inputDropdownMenu = this.makeInputDropdownMenu(thing);
      const fileUploadButton = this.showFileUploadButton(index);
      const deleteButton = this.makeDeleteButton(index);
      const textInput = this.showTextInput(index);
      const functionName = this.state.functions[thing];
      var x = this.state.inputs[0]['type'];
      return (
<div className="h">
       {inputDropdownMenu}
       <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange} value={functionName}>
    <option value="Choose function">Choose function</option>
    <option value="Get text from text file">Get text from text file</option>
    <option value="Split text into sections">Split text into sections</option>
    <option value="Find most relevant section">Find most relevant section</option>
    <option value="Submit query about text">Submit query about text</option>
    <option value="Tesseract OCR from PDF">Tesseract OCR from PDF</option>
    <option value="Get sentences from CSV">Get sentences from CSV</option>
    <option value="Word document to text file">Word document to text file</option>
    <option value="Get sentences from url">Get sentences from url</option>
    <option value="Get labels">Get labels</option>
    <option value="Compare with labels">Compare with labels</option>
    <option value="Union of outputs">Union of outputs</option>
    <option value="Get intents and examples">Get intents and examples</option>
    <option value="Classify intent">Classify intent</option>
    <option value="Random sample from array">Random sample from array</option>
    <option value="Make api link">Make api link</option>
    <option value="Return earlier output">Return earlier output</option>
  </select>  

         <div className="p">{outputName}</div> 
         {deleteButton}
</div>
       {fileUploadButton}
       {textInput}
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
    let saveNameBox = '';
    if (this.state.show_save_name_box){
      saveNameBox = <SaveNameTextInput onEnter={this.handleNameBoxEnter} name={name}/> 
    }
    let save_message = this.state.save_message ? this.state.save_message : '';
    

    const result = resultList.map(thing => {
    return (
    <div>{thing}</div>    
    );
    }
    );
    return (
<div>
<div>

<button className="n2" onClick={() => this.saveFlow()}>Save Flow</button> 
{saveNameBox}
<p>
{save_message}
</p>
</div>
    <div>
      {steps}
      <button className="n2" onClick={() => this.addStep()}>Add step</button>
      <p></p>
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



export default withParams(Flow);





