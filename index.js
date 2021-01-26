import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     moose: ['dog', 'cat']
    };
  }
  
  addStep() {
  this.setState({
    moose: this.state.moose.concat('fish')
  })
  }

  render() {
    const moose = this.state.moose;

    
    const steps = moose.map(thing => {
      const desc = 'Choose function';
      return (
        <div>
         <div className="b">mate</div>       
        <button className="a" onClick={() => alert('click')}>{desc}</button>
        
          
          
        </div>
      );
    });
    return (
    <div>
     <button onClick={() => this.addStep()}>Add step</button>
      {steps}
      </div>
     
    );
  }
}

// ========================================

ReactDOM.render(<Steps />, document.getElementById("root"));


