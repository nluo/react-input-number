import * as React from 'react';
const round = require('lodash-round');

const defaultDivStyle = {
  margin: '10px auto',
  width: '100%'
};

const defaultButtonStyle = {
  height: '30px',
  width: '15%'
};

const defaultLabelStyle = {
  paddingLeft: '5px',
  paddingBottom: '5px',
  textAlign: 'left'
};

function formatNumber(num: number, format: number) {
  return round(num, format).toFixed(2);
}

export interface InputProps {
  step: number;
  min: number;
  max: number;
  format: number;
  divisor: number;
  label: string;
  componentStyle?: any;
  buttonClassName?: string;
  inputBoxClassName?: string;
  labelStyle?: string;
}

class InputNumberSpinner extends React.Component<InputProps, any> {
  public static defaultProps: Partial<InputProps> = {
    min: -Infinity,
    max: Infinity,
    format: 0,
    componentStyle: {},
    inputBoxClassName: 'defaultInputNumberWidgetInputClass',
    buttonClassName: 'defaultInputNumberWidgetClass',
    divisor: 1
  };

  public constructor(props: any) {
    super(props);
    this.state = {
      displayValue: formatNumber(0, props.format)
    };
  }
  public decrement() {
    const currentValue = Number(this.state.displayValue);
    const result = Number(
      (currentValue - this.props.step).toFixed(this.props.format)
    );

    if (result >= this.props.min) {
      this.setState({
        displayValue: formatNumber(result, this.props.format)
      });
    }
  }

  public increment() {
    const currentValue = Number(this.state.displayValue);
    const result = Number(
      (currentValue + this.props.step).toFixed(this.props.format)
    );
    this.setState({
      displayValue: formatNumber(result, this.props.format)
    });
  }

  public handleInputChange(event: any) {
    event.preventDefault();
    const inputValue = event.target.value;
    if (Number.isNaN(Number(inputValue))) {
      return;
    }
    this.setState({
      displayValue: inputValue
    });
  }

  public handleInputOnBlur(event: any) {
    this.setState({
      displayValue: formatNumber(Number(this.state.displayValue), this.props.format)
    });
  }

  render() {
    const outterDivStyle = Object.assign(
      {},
      defaultDivStyle,
      this.props.componentStyle ? this.props.componentStyle : {}
    );
    const buttonStyle = Object.assign({}, defaultButtonStyle);

    const innerDivStyle = {
      width: '100%',
      display: 'flex'
    };

    const inputBoxStyle = {
      width: '65%',
      textAlign: 'center'
    };

    return (
      <div style={outterDivStyle}>
        <div style={defaultLabelStyle}>
          {this.props.label}
        </div>
        <div style={innerDivStyle}>
          <button
            style={buttonStyle}
            onClick={() => {
              this.decrement();
            }}
            disabled={this.state.displayValue <= this.props.min}
            className={this.props.buttonClassName ? this.props.buttonClassName : ''}
          >
            -
          </button>
          <input
            type="text"
            value={this.state.displayValue}
            onChange={event => {
              this.handleInputChange(event);
            }}
            onBlur={event => {
              this.handleInputOnBlur(event);
            }}
            className={
              this.props.inputBoxClassName ? this.props.inputBoxClassName : ''
            }
            style={inputBoxStyle}
          />
          <button
            style={buttonStyle}
            onClick={() => {
              this.increment();
            }}
            className={this.props.buttonClassName ? this.props.buttonClassName : ''}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
export default InputNumberSpinner;
