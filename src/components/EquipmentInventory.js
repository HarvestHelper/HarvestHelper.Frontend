import React, { Component } from 'react';
import { Col, Container, Row, Table, Button, Form } from 'react-bootstrap';

export class EquipmentInventory extends Component
{
  static displayName = EquipmentInventory.name;

  constructor(props)
  {
    super(props);
    this.state = { farmId: '', items: [], renderItems: false, loading: true, loadedSuccess: false };
  }

  onChange = e =>
  {
    this.setState({ [e.target.name]: e.target.value })
  }

  async populateItems()
  {
    if (this.state.farmId === '')
    {
      return;
    }

    this.setState({ items: [], renderItems: true, loading: true, loadedSuccess: false })
    fetch(`${window.EQUIPMENTINVENTORY_ITEMS_API_URL}?farmId=${this.state.farmId}`)
      .then(response => response.json())
      .then(returnedItems => this.setState({ items: returnedItems, loading: false, loadedSuccess: true }))
      .catch(err =>
      {
        console.log(err);
        this.setState({ items: [], loading: false, loadedSuccess: false })
      });
  }

  renderInputs()
  {
    return <Form inline >
      <Form.Label htmlFor="farmId" srOnly>User Id:</Form.Label>
      <Form.Control
        className="mb-2 mr-sm-2"
        style={{ minWidth: "350px" }}
        type="text"
        name="farmId"
        id="farmId"
        placeholder="Enter a user id"
        onChange={this.onChange}
        value={this.state.farmId} />
      <Button className="mb-2" variant="primary" onClick={() => this.populateItems()}>Get EquipmentInventory</Button>
    </Form>;
  }

  renderItemsTable()
  {
    return this.state.renderItems === false ? ''
      : this.state.loading ? <p><em>Loading...</em></p>
        : this.state.loadedSuccess === false ? <p>Could not load items</p>
          : <Container style={{ paddingTop: "10px", paddingLeft: "0px" }}>
            <Row>
              <Col>
                <Table striped>
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!this.state.items || this.state.items.length <= 0 ?
                      <tr>
                        <td colSpan="6" align="center"><b>No Items yet</b></td>
                      </tr>
                      : this.state.items.map(item => (
                        <tr key={item.equipmentItemId}>
                          <td>
                            {item.name}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>;
  }

  render()
  {
    return (
      <div>
        <h1 id="tabelLabel" >EquipmentInventory</h1>
        {this.renderInputs()}
        {this.renderItemsTable()}
      </div>
    );
  }
}
