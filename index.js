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
    this.handleAdditionalInputChangeMore = this.handleAdditionalInputChangeMore.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.showTextInput = this.showTextInput.bind(this);
  }
  
  addStep() {
  const currentStepNumber = this.state.currentStepNumber + 1;
  this.setState({
    stepNumbers: this.state.stepNumbers.concat(currentStepNumber),
    currentStepNumber: currentStepNumber,
    inputs: this.state.inputs.concat({'type': 'undefined'}),
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
    return(<div className="l">(Optional) Page numbers inclusive, separated by dash:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Split text into sections"){
    return(<div className="l">Number of words per section:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Find most relevant section"){
    return(<div className="l2">Query:<input type="text" size="200" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Submit query about text"){
    return(<div className="l2">Query:<input type="text" size="200" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Get sentences from CSV"){
    return(<div className="l">Column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Get labels"){
    return(
    <div className="l">Label column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Compare with labels"){
    return(
    <div>
    <div className="l">Label output to use:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>
    <div className="l">Text output to use:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore}></input></div>
    </div>)
  }
  if(this.state.functions[index] == "Get intents and examples"){
    return(
    <div>
    <div className="l">Example column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>
    <div className="l">Intent column name:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore}></input></div>
    </div>)
  }
  if(this.state.functions[index] == "Compare two label dicts"){
    return(
    <div>
    <div className="l">Label output number:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>
    <div className="l">Confidence threshold:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore}></input></div>
    </div>)
  }
  if(this.state.functions[index] == "Classify intent"){
    return(<div className="l">Intents and examples input:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }  
  if(this.state.functions[index] == "Entails"){
    return(<div className="l">Hypothesis:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }  
  if(this.state.functions[index] == "Get sentences from url"){
    return(<div className="l">Url:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>)
  }  
  if(this.state.functions[index] == "Ask question"){
    return(
    <div>
    <div className="l">Question:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>
    <div className="l">Model [choose from the Models page]:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChangeMore}></input></div>
    </div>
    )
  }  
  if(this.state.functions[index] == "Random sample from array"){
    return(<div className="l">Sample size<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }   
  if(this.state.functions[index] == "Union of outputs"){
    return(<div className="l">Outputs:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }
  if(this.state.functions[index] == "Classify intent with array input"){
    return(<div className="l">Intents and examples input:<input type="text" id={index} size="70" onChange={this.handleAdditionalInputChange}></input></div>)
  }      
  if(this.state.functions[index] == "Get label dict"){
    return(
    <div>
    <div className="l">Text column name:<input type="text" id={index} onChange={this.handleAdditionalInputChange}></input></div>
    <div className="l">Label column name:<input type="text" id={index} onChange={this.handleAdditionalInputChangeMore}></input></div>
    </div>)
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
  const array2 = this.state.stepNumbers.map(function(stepNumber){
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
  return(
         <div className="f">   <select name="input" id={thing} onChange={this.handleInputDropdownChange}>
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
  
  render() {
    const stepNumbers = this.state.stepNumbers;  
    const steps = stepNumbers.map(thing => {
      const outputName = 'output ' + (thing + 1); 
      const index = thing;
      const additionalInputs = this.makeAdditionalInputs(index);
      const inputDropdownMenu = this.makeInputDropdownMenu(thing);
      const fileUploadButton = this.showFileUploadButton(index);
      const textInput = this.showTextInput(index);
      var x = this.state.inputs[0]['type'];
      return (
<div className="h">
       {inputDropdownMenu}
       <div className="f">   <select name="functions" id={thing} onChange={this.handleDropdownChange}>
    <option value="Choose function">Choose function</option>
    <option value="Get text from text file">Get text from text file</option>
    <option value="Split text into sections">Split text into sections</option>
    <option value="Find most relevant section">Find most relevant section</option>
    <option value="Submit query about text">Submit query about text</option>
    <option value="Tesseract OCR from PDF">Tesseract OCR from PDF</option>
    <option value="Get sentences from CSV">Get sentences from CSV</option>
    <option value="Semantic search">Semantic search</option>
    <option value="Find relevant sentence">Find relevant sentence</option>
    <option value="Word document to text file">Word document to text file</option>
    <option value="Text file to sentences">Text file to sentences</option>
    <option value="Find sentences with string">Find sentences with string</option>
    <option value="Entails">Entails</option>
    <option value="Get sentences from url">Get sentences from url</option>
    <option value="Ask question">Ask question</option>
    <option value="Get labels">Get labels</option>
    <option value="Compare with labels">Compare with labels</option>
    <option value="Union of outputs">Union of outputs</option>
    <option value="Get intents and examples">Get intents and examples</option>
    <option value="Classify intent">Classify intent</option>
    <option value="Get label dict">Get label dict</option>
    <option value="Classify intent with array input">Classify intent with array input</option>
    <option value="Compare two label dicts">Compare two label dicts</option>
    <option value="Random sample from array">Random sample from array</option>
    <option value="Make api link">Make api link</option>
    <option value="Return earlier output">Return earlier output</option>
  </select>  

         <div className="p">{outputName}</div> 
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
    const result = resultList.map(thing => {
    return (
    <div>{thing}</div>    
    );
    }
    );
    return (
<div>
<div>
<p>
Backer is a platform for NLP tasks which aims to minimise the amount of work and coding to integrate models and sources of data. 
</p>
<p>
Simply construct a flow below by pressing the 'Add step' button to add a step, which can introduce a new data source (e.g. a directory you upload, a video, an image, a website, etc.), or carry out a new task.
</p>
<p>
Each step produces an output which is used as a possible input for later steps. 
</p>
<p>
The final output of the flow is printed at the bottom of the page, or can be downloaded in different formats, depending on the last step you choose. 
</p>
<p>
You can also make the flow into an api, by choosing the 'Make api link'. 
</p>
<p>
Save your flow and allow other people to use it by pressing the 'Save flow' button. 
</p>
<p>
Train a new model on the 'Train model' page, which can then be used to do a new NLP task.
</p>
<p>
For demos, look at the 'Flows' page. 
</p>
</div>
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



