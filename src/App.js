import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Equipment } from './components/Equipment';
import { EquipmentInventory } from './components/EquipmentInventory';
import { ApplicationPaths } from './components/Constants';

import './App.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path={ApplicationPaths.EquipmentPath} component={Equipment} />
        <Route path={ApplicationPaths.EquipmentInventoryPath} component={EquipmentInventory} />
      </Layout>
    );
  }
}
