import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

class Index1 extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      a: 1,
      b: 2,
      c: 3,
    };
  }
  handerClick = () => {
    const { a, b, c } = this.state;
    // 批量更新
    // this.setState({ a: a + 1 });
    // this.setState({ b: b + 1 });
    // this.setState({ c: c + 1 });

    setTimeout(() => {
      this.setState({ a: a + 1 });
      this.setState({ b: b + 1 });
      this.setState({ c: c + 1 });
    }, 0); //批量更新失效
  };
  render() {
    console.log(11111);
    return <div onClick={this.handerClick}>BTN</div>;
  }
}

const Index = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState({});
  const [c, setC] = useState(1);
  // const handerClick = () => {
  //   // 批量更新
  //   setB({ ...b });
  //   setC(c + 1);
  //   setA(a + 1);
  // };

  const handerClick = () => {
    // 批量更新失效
    Promise.resolve().then(() => {
      // setB({ ...b });
      // setC(c + 1);
      // setA(a + 1);

      // 解决办法
      unstable_batchedUpdates(() => {
        setB({ ...b });
        setC(c + 1);
        setA(a + 1);
      });
    });
  };
  return <div onClick={handerClick}>btn</div>;
};

export default Index;
