import { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {func} from 'prop-types';

class ProductList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            products: [],
            selectedProductId: null
        }
    }


    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
        .then(response => {
            this.setState({products: response.data});
        })
        .catch(error => {
            console.error('Error fetching data.', error)
        })
    }

    selectProduct = (id) => {
        this.setState({selectedProductId: id});
        this.props.onProductSelect(id);
    }

    deleteProduct = (productId) => {
        axios.delete(`http://127.0.0.1:5000/products/${productId}`)
            .then(() => {
                this.fetchProducts();
            })
            .catch(error => {
                console.error('Error deleting product', error)
            })
    }

    render() {
        const {products} = this.state;

        return (
            <div>
                <h3>Products</h3>
                <ul>
                    {products.map(product =>(
                        <li key={product.id}>
                            <Link to={`/edit-product/${product.id}`}>{product.name}</Link>
                            <button onClick={() => this.deleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

            </div>
        );
    };
};

ProductList.propType = {
    onProductSelect: func
}


export default ProductList