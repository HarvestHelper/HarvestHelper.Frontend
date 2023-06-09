import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import { ApplicationPaths } from './Constants';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
      role: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name,
      role: user && user.role
    });
  }

  render() {
    return (
      <div>
        <h1>HarvestHelper</h1>
        <p>Welcome to the HarvestHelper website.</p>
        <p>To get started, you can:</p>
        <ul>
          <li>Check your <Link to={ApplicationPaths.EquipmentInventoryPath}>EquipmentInventory</Link></li>
          {this.adminView()}
        </ul>
        <p>You can also</p>
        <ul>
          <li>Manage the <a href={window.RABBITMQ_URL} target="_blank" rel="noreferrer">message queues</a></li>
          <li>Explore the Open API documentation:
          <ul>
              <li><a href={`${window.EQUIPMENT_SERVICE_URL}/swagger`} target="_blank" rel="noreferrer">Equipment service</a></li>
              <li><a href={`${window.EQUIPMENTINVENTORY_SERVICE_URL}/swagger`} target="_blank" rel="noreferrer">EquipmentInventory service</a></li>
              <li><a href={`${window.IDENTITY_SERVICE_URL}/swagger`} target="_blank" rel="noreferrer">Identity service</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  adminView() {
    if (this.state.isAuthenticated && this.state.role === "Admin") {
      return (<Fragment>
        <li>Manage the <Link to={ApplicationPaths.EquipmentPath}>Equipment</Link></li>
        <li>Manage registered <Link to={ApplicationPaths.UsersPath}>Users</Link></li>
      </Fragment>);
    }
  }
}
