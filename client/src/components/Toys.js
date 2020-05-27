import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Box, Heading, Text, Mask, IconButton} from 'gestalt';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { calculatePrice, setCart, getCart } from '../utils';

import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class Toys extends React.Component {
    state = {
        toys: [],
        brand: '',
        cartItems: [],
        loadingToys: true
    }

    async componentDidMount() {
        try {
        const response = await strapi.request('POST', '/graphql', {
            data: {
                query: `query {
                    brand(id:"${this.props.match.params.brandId}") {
                      _id
                      name
                      toys {
                        _id
                        name
                        description
                        image {
                          url
                        }
                        price
                      }
                    }
                  }`
            }
        });
        // console.log(response);
        this.setState({
            toys: response.data.brand.toys,
            brand: response.data.brand.name,
            loadingToys: false,
            cartItems: getCart()
        });
    } catch (err) {
        console.error(err);
        this.setState({loadingToys: false});
    }
}

addToCart = toy => {
  const alreadyInCart = this.state.cartItems.findIndex(item => item._id === toy._id)

  if (alreadyInCart === -1) {
    const updatedItems = this.state.cartItems.concat({
      ...toy,
      quantity: 1
    });
    this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
  } else {
    const updatedItems = [...this.state.cartItems];
    updatedItems[alreadyInCart].quantity += 1;
    this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
  }
};

deleteItemFromCart = itemToDeleteId => {
  const filteredItems = this.state.cartItems.filter(
    item => item._id !== itemToDeleteId
  );
  this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
}

    render() {
      const { brand, toys, cartItems, loadingToys } = this.state;

        return (
          <Container>
                {/* User cart */}
                <Box
                  alignSelf="end"
                  marginTop={2}
                  marginLeft={8}
                >
                  <Mask shape="rounded" wash>
                    <Box
                      display="flex"
                      direction="column"
                      alignItems="center"
                      padding={2}
                    >
                      {/* User cart heading */}
                      <Heading
                        align="center"
                        size="md"
                      >
                        Your Cart
                      </Heading>
                      <Text color="gray" italic>
                        {cartItems.length} items selected
                      </Text>

                      {/* Cart items */}
                      {cartItems.map(item => (
                        <Box key={item._id} display="flex" alignItems="center">
                          <Text>
                            {item.name} x {item.quantity} - {(item.quantity * item.price).toFixed(2)}
                          </Text>
                          <IconButton
                            accessibilityLabel="Delete Item"
                            icon="cancel"
                            size="sm"
                            iconColor="red"
                            onClick={() => this.deleteItemFromCart(item._id)}
                          >

                          </IconButton>
                        </Box>
                      ))}

                        <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        >
                          <Box margin={2}>
                            {cartItems.length === 0 && (
                              <Text color="red">Please select some items</Text>
                            )}
                          </Box>
                            <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                          <Text>
                            <Link to="/checkout">Checkout</Link>
                          </Text>

                        </Box>
                    </Box>

                  </Mask>
                </Box>
            {/* Toys heading */}
            <Box margin={2}>
              <Heading color="orchid">{brand}</Heading>
            </Box>
            {/* Toys section */}
            <Container>
              <Row>
                {toys.map(toy => (
                    <Col xs="4" key={toy._id}>  
                    <Card> 
                      <CardImg top width="100%" src={`${apiURL}${toy.image.url}`} alt="Card image cap" />
                      <CardBody>
                        <CardTitle>{toy.name}</CardTitle>
                        <CardSubtitle>{toy.description}</CardSubtitle>
                        <Button onClick={() => this.addToCart(toy)} 
                                outline color="primary">Add to Cart
                        </Button>
                      </CardBody>
                    </Card>
                    </Col>
                ))}
              </Row>
            </Container>
            <Loader show={loadingToys}></Loader>
          </Container>
        )
    }
}

export default Toys;