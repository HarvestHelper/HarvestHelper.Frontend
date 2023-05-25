import React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import authService from '../api-authorization/AuthorizeService'

export default class ItemForm extends React.Component
{
    state = {
        id: 0,
        name: '',
        alertVisible: false,
        validated: false
    }

    componentDidMount()
    {
        if (this.props.item)
        {
            const { id, name } = this.props.item
            this.setState({ id, name });
        }
    }
    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = (e) =>
    {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false)
        {
            e.stopPropagation();
        }
        else
        {
            this.createItem();
        }

        this.setState({ validated: true });
    }

    async createItem()
    {
        const token = await authService.getAccessToken();
        fetch(`${window.EQUIPMENT_ITEMS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then(async response =>
            {
                if (!response.ok)
                {
                    const errorData = await response.json();
                    console.error(errorData);
                    throw new Error(`Could not add the item: ${errorData.title}`);
                }

                return response.json();
            })
            .then(item =>
            {
                this.props.addItemToState(item);
                this.props.toggle();
            })
            .catch(err => 
            {
                this.showAlert(err.message);
            });
    }

    submitEdit = e =>
    {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false)
        {
            e.stopPropagation();
        }
        else
        {
            this.updateItem();
        }

        this.setState({ validated: true });
    }

    async updateItem()
    {
        const token = await authService.getAccessToken();
        fetch(`${window.EQUIPMENT_ITEMS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name
            })
        })
            .then(async response =>
            {
                if (!response.ok)
                {
                    const errorData = await response.json();
                    console.error(errorData);
                    throw new Error(`Could not update the item: ${errorData.title}`);
                }

                this.props.toggle();
                this.props.updateItemIntoState(this.state.id);
            })
            .catch(err => 
            {
                this.showAlert(err.message);
            });
    }

    showAlert = (message) =>
    {
        this.setState({
            alertMessage: message,
            alertColor: "danger",
            alertVisible: true
        });
    }

    render()
    {
        return <Form noValidate validated={this.state.validated} onSubmit={this.props.item ? this.submitEdit : this.submitNew}>
            <Form.Group>
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control type="text" name="name" onChange={this.onChange} value={this.state.name} required />
                <Form.Control.Feedback type="invalid">The Name field is required</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Save</Button>

            <Alert style={{ marginTop: "10px" }} variant={this.state.alertColor} show={this.state.alertVisible}>
                {this.state.alertMessage}
            </Alert>
        </Form>;
    }
}