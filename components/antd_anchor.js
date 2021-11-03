//React单页面应用使用antd的锚点跳转失效
//首先在react项目中引用antd的锚点

import { Anchor } from 'antd';
const { Link } = Anchor;
<Anchor>
  <Link href="#components-anchor-demo-basic" title="Basic demo" />
  <Link href="#components-anchor-demo-static" title="Static demo" />
  <Link href="#API" title="API">
    <Link href="#Anchor-Props" title="Anchor Props" />
    <Link href="#Link-Props" title="Link Props" />
  </Link>
</Anchor>
  //测试
  <div id="components-anchor-demo-basic" style={{ marginTop: "1000px" }}>
    dddd
</div>
  <div id="components-anchor-demo-static" style={{ marginTop: "2000px" }}>
    ffff
</div>

// 发现页面进行跳转而不是点位到页面的锚点，发现url有所改变
// 解决办法: 加上location.hash可以解决
  < Anchor >
  <Link href={location.hash + "#components-anchor-demo-basic"} title="Basic demo" />
  <Link href={location.hash + "#components-anchor-demo-static"} title="Static demo" />
  <Link href="#API" title="API">
    <Link href="#Anchor-Props" title="Anchor Props" />
    <Link href="#Link-Props" title="Link Props" />
  </Link>
</Anchor >


// React不引入antd如何实现锚点跳转 代码如下：
scrollToAnchor(id){
  document.getElementById(id).scrollIntoView(false);
}
render:
<div className="anchorLink">
  <div className="navLink">
    <ul>
      <li>
        <a href="javascript:;" onClick={() => this.scrollToAnchor('Summarize')}>Summarize</a>
      </li>
      <li>
        <a href="javascript:;" onClick={() => this.scrollToAnchor('ProductFunction')}>ProductFunction</a>
      </li>
      <li>
        <a href="javascript:;" onClick={() => this.scrollToAnchor('ToHelpAnswer')}>ToHelpAnswer</a>
      </li>
    </ul>
  </div>
</div>
  <div id="Summarize" style={{ marginTop: '100px' }}>点点滴滴</div>
  <div id="ProductFunction" style={{ marginTop: '500px' }} >fffffffff</div>
  <div id="ToHelpAnswer" style={{ marginTop: '1000px' }}>wwwwwww</div>