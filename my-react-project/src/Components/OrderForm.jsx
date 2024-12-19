import { Component } from "react";
import axios from "axios";
import {func, number} from 'prop-types';

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id: '',
            date: '',
            products: '',
            errors: {},
            selectedOrderId: null,
            isLoading: false
        }
    }

    componentDidMount() {
        const{id} = this.props.params;
        console.log(id);
        if (id) {
            this.fetchOrderData(id);
        }
    }

    fetchOrderData = (id) => {
        axios.get(`http://127.0.0.1:5000/orders/${id}`)
            .then(response => {
                const orderData = response.data;
                this.setState({
                    customer_id: orderData.customer_id,
                    date: orderData.date,
                    products: orderData.products,
                    selectedOrderId: id
                });
            })
            .catch(error => {
                console.error('Error fetching order data', error)
            });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.orderId !== this.props.orderId) {
            this.setState({selectedOrderId: this.props.orderId});

            if(this.props.orderId) {
                axios.get(`http://127.0.0.1:5000/customers/${this.props.orderId}`)
                .then(response => {
                    const orderData = response.data;
                    this.setState({
                        customer_id: orderData.customer_id,
                        date: orderData.date,
                        products: orderData.products
                    });
                })
                .catch(error => {
                    console.error('Error fetching order data', error)
                })
            } else {
                this.setState({
                    customer_id: '',
                    date: '',
                    orders: ''
                });
            }
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }


    validateForm = () => {
        const {customer_id, date, products} = this.state;
        const errors = {};
        if(!customer_id) errors.customer_id = 'Customer Id is required';
        if(!date) errors.date = 'Date is required';
        if(!products) errors.products = 'Products are required';
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0 ) {
            this.setState({isLoading: true, errors: null})
            const orderData = {
                customer_id: this.state.customer_id.trim(),
                date: this.state.date.trim(),
                orders: this.state.orders.trim()
            };
            const apiUrl = this.state.selectedCustomerId
                ? `http://127.0.0.1:5000/orders/${this.state.selectedOrderId}`
                : `http://127.0.0.1:5000/orders`;

            const httpMethod = this.state.selectedOrderId ? axios.put : axios.post;

            httpMethod(apiUrl, orderData) 
            .then(() => {
                this.setState({
                    customer_id: '',
                    date: '',
                    orders: '',
                    errors: {},
                    selectedOrderId: null,
                    isLoading: false
                });
                this.props.navigate('/orders')
                this.setState({isLoading: false});

            })
            .catch(error => {
                this.setState({ error: error.toString(), isLoading: false});

            });

        } else {
            this.setState({errors});
        }
    }

    render() {
        const {customer_id, date, products, errors} = this.state;

        return(
            <form onSubmit={this.handleSubmit} >
                <h3>Add/Edit Orders</h3>
                <label>
                    Customer_ID:
                    <input type="text" name="customer_id" value={customer_id} onChange={this.handleChange} />
                    {errors.customer_id && <div style={{color: 'red'}}>{errors.customer_id}</div>}
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" name="date" value={date} onChange={this.handleChange} />
                    {errors.date && <div style={{color: 'red'}}>{errors.date}</div>}
                </label>
                <br />
                <label>
                    Products:
                    <input type="text" name="products" value={products} onChange={this.handleChange} />
                    {errors.products && <div style={{color: 'red'}}>{errors.products}</div>}
                </label>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default OrderForm