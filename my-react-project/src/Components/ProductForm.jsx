import { Component } from "react";
import axios from "axios";
import {func, number} from 'prop-types';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            errors: {},
            selectedProductId: null,
            isLoading: false
        }
    }

    componentDidMount() {
        const{id} = this.props.params;
        console.log(id);
        if (id) {
            this.fetchProductData(id);
        }
    }

    fetchProductData = (id) => {
        axios.get(`http://127.0.0.1:5000/products/${id}`)
            .then(response => {
                const productData = response.data;
                this.setState({
                    name: productData.name,
                    price: productData.price,
                    selectedProductId: id
                });
            })
            .catch(error => {
                console.error('Error fetching product data', error)
            });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.productId !== this.props.productId) {
            this.setState({selectedProductId: this.props.productId});

            if(this.props.productId) {
                axios.get(`http://127.0.0.1:5000/products/${this.props.productId}`)
                .then(response => {
                    const productData = response.data;
                    this.setState({
                        name: productData.name,
                        price: productData.price
                    });
                })
                .catch(error => {
                    console.error('Error fetching product data', error)
                })
            } else {
                this.setState({
                    name: '',
                    price: ''
                });
            }
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }


    validateForm = () => {
        const {name, price} = this.state;
        const errors = {};
        if(!name) errors.name = 'Name is required';
        if(!price) errors.price = 'Price is required';
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0 ) {
            this.setState({isLoading: true, errors: null})
            const productData = {
                name: this.state.name.trim(),
                price: String(this.state.price).trim()
            };
            const apiUrl = this.state.selectedProductId
                ? `http://127.0.0.1:5000/products/${this.state.selectedProductId}`
                : `http://127.0.0.1:5000/products`;

            const httpMethod = this.state.selectedProductId ? axios.put : axios.post;

            httpMethod(apiUrl, productData) 
            .then(() => {
                this.setState({
                    name: '',
                    price: '',
                    errors: {},
                    selectedProductId: null,
                    isLoading: false
                });
                this.props.navigate('/products')
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
        const {name, price, errors} = this.state;

        return(
            <form onSubmit={this.handleSubmit} >
                <h3>Add/Edit Products</h3>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                    {/* {errors.name && <div style={{color: 'red'}}>{errors.name}</div>} */}
                </label>
                <br />
                <label>
                    Price:
                    <input type="text" name="price" value={price} onChange={this.handleChange} />
                    {/* {errors.price && <div style={{color: 'red'}}>{errors.price}</div>} */}
                </label>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default ProductForm
