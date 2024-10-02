import { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {func} from 'prop-types';

class OrderList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            orders: [],
            selectedOrderId: null
        }
    }


    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = () => {
        axios.get('http://127.0.0.1:5000/orders')
        .then(response => {
            this.setState({orders: response.data});
        })
        .catch(error => {
            console.error('Error fetching data.', error)
        })
    }

    selectOrder = (id) => {
        this.setState({selectedOrderId: id});
        this.props.onOrderSelect(id);
    }

    deleteOrder = (orderId) => {
        axios.delete(`http://127.0.0.1:5000/orders/${order.id}`)
            .then(() => {
                this.fetchOrders();
            })
            .catch(error => {
                console.error('Error deleting order', error)
            })
    }

    render() {
        const {orders} = this.state;

        return (
            <div>
                <h3>Orders</h3>
                <ul>
                    {orders.map(order =>(
                        <li key={order.id}>
                            <Link to={`/edit-order/${order.id}`}>Order Number:{order.id}</Link>
                            <button onClick={() => this.deleteOrder(order.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

            </div>
        );
    };
};

OrderList.propTypes = {
    onOrderSelect: func
}


export default OrderList