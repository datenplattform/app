import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {browserHistory, Route, Router} from 'react-router';
import App from './App.jsx';
import HomePage from '../pages/HomePage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import CurrencyExplorerPage from '../pages/CurrencyExplorerPage.jsx';
import CurrencyDetailPage from '../pages/CurrencyDetailPage.jsx';
import MachineLearningPage from '../pages/MachineLearningPage.jsx';
import MachineVisionPage from '../pages/MachineVisionPage.jsx';
import ModelEditorPage from '../pages/ModelEditorPage.jsx';
import QuantumPage from '../pages/QuantumPage.jsx';
import DataVideoPage from '../pages/DataVideoPage.jsx';

export default class MainRouter extends PureComponent {
  constructor() {
    super();

    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304,
      }
    }
  }

  getChildContext() {
    return {
      navOpenState: this.state.navOpenState,
    };
  }

  appWithPersistentNav = () => (props) => (
    <App onNavResize={this.onNavResize} {...props} />
  );

  onNavResize = (navOpenState) => {
    this.setState({
      navOpenState,
    });
  };

  render() {
    browserHistory.listen(function (ev) {
      console.log('listen', ev.pathname);
    });

    return (
      <Router history={browserHistory}>
        <Route component={this.appWithPersistentNav()}>
          <Route path="/" component={HomePage}/>
          <Route path="/currencies" component={CurrencyExplorerPage}/>
          <Route path="/currencies/:currency" component={CurrencyDetailPage}/>
          <Route path="/machine-learning" component={MachineLearningPage}/>
          <Route path="/machine-learning/model-editor" component={ModelEditorPage}/>
          <Route path="/machine-vision" component={MachineVisionPage}/>
          <Route path="/data/videos" component={DataVideoPage}/>
          <Route path="/quantum" component={QuantumPage}/>
          <Route path="/settings" component={SettingsPage}/>
        </Route>
      </Router>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object,
};
