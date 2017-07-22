import * as React from 'react';

const defaultDivStyle = {
  marginTop: '10px',
  width: '300px'
};

const defaultButtonStyle = {
  height: '30px',
  width: '15%',
  border: 0,
  backgroundColor: 'rgba(0,0,0,.075)',
  fontSize: '20px'
};

const defaultLabelStyle = {
  paddingLeft: '5px',
  paddingBottom: '5px',
  textAlign: 'left'
};

const defaultInputBoxStyle = {
  width: '65%',
  textAlign: 'center',
  height: '30px'
};

function formatNumber(num: number, format: number) {
  return num.toFixed(format);
}

export interface InputProps {
  step: number;
  min?: number;
  max?: number;
  format?: number;
  label?: string;
  componentStyle?: any;
  buttonClassName?: string;
  inputBoxClassName?: string;
  labelStyle?: string;
  leftButtonStyle?: any;
  rightButtonStyle?: any;
}

class NumberSpinner extends React.Component<InputProps, any> {
  public static defaultProps: Partial<InputProps> = {
    min: -Infinity,
    max: Infinity,
    format: 0,
    componentStyle: {},
    inputBoxClassName: 'defaultInputNumberWidgetInputClass',
    buttonClassName: 'defaultInputNumberWidgetClass',
    leftButtonStyle: null,
    rightButtonStyle: null,
    label: null
  };

  public constructor(props: any) {
    super(props);
    this.state = {
      displayValue: formatNumber(0, props.format)
    };
  }
  public decrement() {
    const currentValue = Number(this.state.displayValue);
    const result = Number(currentValue - this.props.step);

    if (result >= this.props.min) {
      this.setState({
        displayValue: formatNumber(result, this.props.format)
      });
    }
  }

  public increment() {
    const currentValue = Number(this.state.displayValue);
    const result = Number(currentValue + this.props.step);
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
    const leftButtonStyle = Object.assign({}, defaultButtonStyle, this.props.leftButtonStyle);
    const rightButtonStyle = Object.assign({}, defaultButtonStyle, this.props.rightButtonStyle);

    const innerDivStyle = {
      width: '100%',
      display: 'flex'
    };

    return (
      <div style={outterDivStyle}>
        {
          this.props.label ? <div style={defaultLabelStyle}>
            {this.props.label}
            </div> : null
        }
        <div style={innerDivStyle}>
          <button
            style={leftButtonStyle}
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
        style={defaultInputBoxStyle}
      />
      <button
        style={rightButtonStyle}
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
export default NumberSpinner;
