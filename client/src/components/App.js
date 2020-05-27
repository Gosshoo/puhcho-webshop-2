import React, { Component } from 'react';
import { Box, SearchField, Icon } from 'gestalt';
import './App.css';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';

const apiURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiURL);

class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
    loadingToys: true
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
            brands {
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });
      // console.log(response);
      this.setState({brands: response.data.brands, loadingToys: false})
    } catch (err) {
      console.error(err);
      this.setState({loadingToys: false});
    }
  }

handleChange = ({value}) => {
  this.setState({ searchTerm: value }, () => this.searchBrands());
};

// filteredToys = ({ searchTerm, brands}) => {
//   return brands.filter(brand => {
//     return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       brand.description.toLowerCase().includes(searchTerm.toLowerCase());
//   })
// };

searchBrands = async () => {
  const response = await strapi.request('POST', '/graphql', {
    data: {
      query: `query {
        brands(where:{
          name_contains: "${this.state.searchTerm}"
        }) {
          _id
          name
          description
          image {
            url
          }
        }
      }`
    }
  });
  console.log(this.state.searchTerm, response.data.brands);
  this.setState({
    brands: response.data.brands,
    loadingToys: false
  });
};

render() {
  const { searchTerm, loadingToys, brands } = this.state;

  return (
    <Container>
      {/* Brands search field */}
      <Box display="flex" justifyContent="center" marginTop={4} marginBottom={4}>
        <SearchField
          id="searchField"
          accessibilityLabel="Toys Search Field"
          onChange={this.handleChange}
          value={searchTerm}
          placeholder="Search Toys"
        >
        </SearchField>
        <Box margin={2}>
          <Icon
            icon="filter"
            color={ searchTerm ? 'orange' : 'gray' }
            size={20}
            accessibilityLabel="filter">
          </Icon>
        </Box>
      </Box>
      {/* Brands section */}
      <Container>
       <Row>
        {brands.map(brand => ( 
        <Col xs="4" key={brand._id}>  
        <Card> 
          <CardImg top width="100%" src={`${apiURL}${brand.image.url}`} alt="Card image cap" />
          <CardBody>
            <CardTitle>{brand.name}</CardTitle>
            <CardSubtitle>{brand.description}</CardSubtitle>
            <Button outline color="primary">
              <Link to={`/${brand._id}`} >See toys</Link>
            </Button>
          </CardBody>
        </Card>
        </Col>
        ))}
      </Row>
      </Container>
      {/* <Spinner 
        show={loadingToys}
        accessibilityLabel="Loading Spinner">
      </Spinner> */}
      <Loader show={loadingToys}></Loader>
    </Container>
  );
}
}

export default App;