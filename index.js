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
  
  hello() {
  this.setState({
    moose: this.state.moose.concat('fish')
  })
  }

  render() {
    const moose = this.state.moose;

    
    const moves = moose.map(thing => {
      const desc = 'Choose function';
      return (
        <li key={thing}>
          <button className="a" onClick={() => alert('click')}>{desc}</button>
          <div className="b">mate</div>
        </li>
      );
    });
    return (
    <div>
     <button onClick={() => this.hello()}>hello</button>
      <ol>{moves}</ol>
      </div>
     
    );
  }
}

// ========================================

ReactDOM.render(<Steps />, document.getElementById("root"));


