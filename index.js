import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     moose: [1, 2],
     currentStepNumber: 2
    };
  }
  
  addStep() {
  const currentStepNumber = this.state.currentStepNumber + 1;
  this.setState({
    moose: this.state.moose.concat(currentStepNumber),
    currentStepNumber: currentStepNumber
  })
  }

  render() {
    const moose = this.state.moose;

    
    const steps = moose.map(thing => {
      const desc = 'Choose function';
      const outputName = 'output ' + thing; 
      return (
<div>
    <form className = "f" action="/action_page.php">
  <input type="file" id="myFile" name="filename"></input>
</form>    

 
      
       <div className="f"> <button  onClick={() => alert('click')}>{desc}</button></div>
         <div className="f">{outputName}</div> 
</div>





      );
    });
    return (
<div>
    <div>
     <button onClick={() => this.addStep()}>Add step</button>
      {steps}
      </div>

<p>Click on the "Add step" button to add steps</p>
  
</div>
    );
  }
}

// ========================================

ReactDOM.render(<Steps />, document.getElementById("root"));


