import React, { useContext } from 'react';

// react 设计模式
const ThemeCentext = React.createContext(null);

// 消费者1
function Consumer() {
  return (
    <ThemeCentext.Consumer>
      {(theme) => {
        console.log('Consumer', theme);
        return <div style={theme}>111111</div>;
      }}
    </ThemeCentext.Consumer>
  );
}

// 消费者2
function UseContent() {
  const theme = useContext(ThemeCentext);
  console.log('UseContent', theme);
  return <div style={{ ...theme, marginTop: '20px' }}>22222</div>;
}

// 消费者3
class ContentType extends React.PureComponent {
  static contextType = ThemeCentext;
  render() {
    const theme = this.context;
    console.log('ContentType', theme);
    return <div style={{ ...theme, marginTop: '20px' }}>33333</div>;
  }
}

class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <Consumer />
        <UseContent />
        <ContentType />
      </div>
    );
  }
}

// 提供者
export default function Privoder() {
  const [theme, setTheme] = React.useState({ color: 'pink', background: '#ccc' });
  return (
    <ThemeCentext.Provider value={theme}>
      <Index />
      <button onClick={() => setTheme({ color: 'blue', background: 'orange' })}>点击</button>
    </ThemeCentext.Provider>
  );
}
