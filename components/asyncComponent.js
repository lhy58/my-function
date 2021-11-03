/**
 * Created by lihanying on 2018/7/31.
 */
// 这是一个react按需加载组件的js
// 用法：const record = asyncComponent(() => import("@/pages/record/record"));

import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }

        async componentDidMount() {
        const { default: component } = await importComponent();

        this.setState({component});
    }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}