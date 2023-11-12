import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

export function ProductsCard({ product, setProducts, cartTotal, setCartTotal, filteredList }) {
 // const [prod_name, setprod_name] = useState('');
  //const [prod_price, setprod_price] = useState(0);
  const [isNikeChecked, setIsNikeChecked] = useState(false)
  const [isPumaChecked, setIsPumaChecked] = useState(false)
  const [filtered, setFiltered] = useState([]);
  const [product2, setProduct2] = useState([...product])
 /* function product_push({ prod_name, prod_price }) {
    const prod_id = product.length + 1;
    setProducts(product => [...product, { id: prod_id, image: "nike9.jpg", name: prod_name, price: prod_price, like: false, cart: false },]);
  }*/
  function likeChange(id) {
    const newObj = [];
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        if (product[i].like) {
          product[i].like = false;
          newObj.push(product[i]);
        }
        else {
          product[i].like = true;
          newObj.push(product[i]);
        }
      }
      else {
        newObj.push(product[i]);
      }
    }
    setProducts(newObj);
  }
  function cartChange(id) {
    const newObj1 = [];
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        if (product[i].cart) {
          product[i].number++;
          newObj1.push(product[i]);
        }
        else {
          product[i].cart = true;

          newObj1.push(product[i]);
        }
      }
      else {
        newObj1.push(product[i]);
      }
    }
    setProducts(newObj1);
  }
  function cartSum() {
    let sum = 0;
    for (let i = 0; i < product.length; i++) {
      if (product[i].cart === true) {
        sum += product[i].number * product[i].price;
      }
    }
    setCartTotal(sum);
  }
  const checkNikeHandler = () => {
    setIsNikeChecked(!isNikeChecked)

  }
  const checkPumaHandler = () =>{
    setIsPumaChecked(!isPumaChecked)
    
  }

  return (
    <div>
        <Row>
          <Col>
            <div className='Filter_box'>
              <Form.Check type="checkbox" id="checkbox" checked={isNikeChecked} onChange={checkNikeHandler} label='Nike'/>
              <Form.Check type="checkbox" id="checkbox1" checked={isPumaChecked} onChange={checkPumaHandler} label= 'Puma'/>
            </div>
          </Col>
          <Col xs={8}>
            <Container>
              <Row xs={1} md={4}>
                {product2.map(item => <Col key={item.id}>
                  <div className='produccard_background'>
                    <Image className='product_image' src={require("./" + item.image)} alt={item.name} fluid></Image>
                    <p className='name'>{item.name}</p>
                    <p className='price'>{item.price} Ft</p>
                    <IconButton color='error' onClick={() => { likeChange(item.id); }}>
                      {item.like ? <AiFillHeart /> : <AiOutlineHeart />}
                    </IconButton>
                    <IconButton onClick={() => { cartChange(item.id); cartSum(); }}><BsCartPlus></BsCartPlus></IconButton>
                  </div>
                </Col>
                )}
              </Row>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      {/*<div>
        Name: <input type='text' id="product_name" value={prod_name} onChange={e => setprod_name(e.target.value)}></input>
        Price: <input type='number' id="product_price" value={prod_price} onChange={e => setprod_price(e.target.value)}></input>
        <button type='submit' onClick={() => { product_push({ prod_name, prod_price }); }}>Felvitel</button>
      </div>*/}
    </div>
  );
}
