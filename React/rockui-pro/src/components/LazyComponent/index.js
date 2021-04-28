import React from 'react';

export const asyncComponent = (loadComponent) =>
  class AsyncComponent extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        Component: null,
      };
      this.hasLoadedComponent = this.hasLoadedComponent.bind(this);
    }
    componentWillMount() {
      console.log(loadComponent, 'loadComponent');
      // 判断是不是已经加载过了
      if (this.hasLoadedComponent()) return;
      loadComponent()
        // 兼容具名和default两种export写法。
        .then((module) => (module.default ? module.default : module))
        .then((Component) => {
          this.setState({
            Component,
          });
        })
        .catch((error) => {
          /*eslint-disable*/
          console.error('cannot load Component in <AsyncComponent>');
          /*eslint-enable*/
          throw error;
        });
    }
    hasLoadedComponent() {
      return this.state.Component !== null;
    }
    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props}></Component> : null;
    }
  };
