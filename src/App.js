import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { LuFilterX } from 'react-icons/lu';
import { Articles } from './Articles';
import { Mynavbar } from './Mynavbar';
import { ProductsCard } from './ProductsCard';

export const article =[{image: 'articleimg.jpg', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"},
                {image: 'articleimg2.jpg'}]
export const delay = 5000;

export default function App() {
  const [product, setProducts] = useState([
  {id: 0, image: "nike1.jpg", name: "Nike", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike1.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"}, 
  {id: 1, image: "nike2.jpg", name: "Nike", price: 10000, like: false, cart: false, number: 1, open: false, galery: "nike2.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 2, image: "nike3.jpg", name: "Puma", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike3.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 3, image: "nike4.jpg", name: "Adidas", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike4.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 4, image: "nike5.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike5.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 5, image: "nike6.jpg", name: "Nike", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike6.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 6, image: "nike7.jpg", name: "Adidas", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike7.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 7, image: "nike8.jpg", name: "Puma", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike8.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 8, image: "nike9.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike9.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 9, image: "nike10.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike10.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 10, image: "nike11.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike11.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 11, image: "nike12.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike12.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 12, image: "nike13.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike13.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 13, image: "nike13.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike13.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
  {id: 14, image: "nike13.jpg", name: "Champion", price: 15000, like: false, cart: false, number: 1, open: false, galery: "nike13.jpg nike10.jpg nike11.jpg nike12.jpg nike13.jpg"},
])
  const [cartTotal, setCartTotal] = useState(0);
  const [filteredItems, setFilteredItems] = useState(product);
  const [selectedFilters, setSelectedFilters] = useState([]);
  return (
    <div className='main'>
      <div className='backgroundImages'>
        <Container>
            <Row>
              <Col md={{offset: 0 }}><Image className='backgroundImagesContent1' src={require("./leaves.png")}  ></Image></Col>
              <Col md={{span: 2, offset: 0 }}> <Image className='backgroundImagesContent2' src={require("./leaves.png")}  ></Image> </Col>
            </Row>
            <Row>
              <Col md={{offset: 0}}><Image className='backgroundImagesContent3' src={require("./leaves.png")}  ></Image></Col>
              <Col md={{span: 2, offset: 0}}> <Image className='backgroundImagesContent4' src={require("./leaves.png")}  ></Image></Col>
            </Row>
            <Row>
              <Col><Image className='backgroundImagesContent5' src={require("./leaves.png")}  ></Image></Col>
            </Row>
        </Container>
      </div>
      <div>
        <Mynavbar product={product} 
                  setProducts={setProducts} 
                  cartTotal={cartTotal} 
                  setCartTotal={setCartTotal} 
                  setFilteredItems={setFilteredItems} 
                  setSelectedFilters={setSelectedFilters}>
        </Mynavbar>
        <Articles></Articles>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div style={{flex: 1, height: '1px', backgroundColor: "rgb(51, 140, 108)"}} />
            <div>
              <p style={{width: '80px', textAlign: 'center', color: "rgb(51, 140, 108)"}}>Products</p>
            </div>
          <div style={{flex: 1, height: '1px', backgroundColor: "rgb(51, 140, 108)"}} />
          </div>
        <ProductsCard product={product} 
                      setProducts={setProducts} 
                      cartTotal={cartTotal} 
                      setCartTotal={setCartTotal} 
                      filteredItems={filteredItems} 
                      setFilteredItems={setFilteredItems} 
                      selectedFilters={selectedFilters} 
                      setSelectedFilters={setSelectedFilters}>
        </ProductsCard>
      </div>
    </div>
  );
}


