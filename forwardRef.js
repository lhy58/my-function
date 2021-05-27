import React, { useEffect } from 'react';

function HOC(Component) {
  class Warp extends React.Component {
    render() {
      const { forwardRef, ...otherprops } = this.props;
      return <Component ref={forwardRef} {...otherprops} />;
    }
  }
  return React.forwardRef((props, ref) => <Warp forwardRef={ref} {...props} />);
}

class Index extends React.Component {
  componentDidMount() {
    console.log('1111');
  }
  handleFun() {
    console.log(22222);
  }
  render() {
    return <div>index</div>;
  }
}

const HocIndex = HOC(Index, true);

export default () => {
  const indexRef = React.useRef();
  useEffect(() => {
    indexRef.current.handleFun();
  }, []);
  return <HocIndex ref={indexRef} />;
};