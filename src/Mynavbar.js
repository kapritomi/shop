import Container from 'react-bootstrap/Container';
import './toggle.css' 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from '@mui/material-next/Badge';
import Form from 'react-bootstrap/Form';
import IconButton from '@mui/material/IconButton';
import { CiCirclePlus } from "react-icons/ci";
import NavDropdown from 'react-bootstrap/NavDropdown';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { CiCircleMinus } from "react-icons/ci";
import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsCartDash } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import ReactModal from 'react-modal';
import { FcShop } from "react-icons/fc";
import { useRef } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import Toggle from 'react-toggle'

export function Mynavbar({ product, setProducts, cartTotal, setCartTotal, setFilteredItems, setSelectedFilters}) {
  const cartcontent = [];
  let cartNumber = 0;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [x, setX] = useState(false);
  const divRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  function cartItems() {
    for (let i = 0; i < product.length; i++) {
      if (product[i].cart === true) {
        cartcontent.push(product[i]);
        cartNumber++;
      }
    }

  }
  function rmvCart(id) {
    const newObj1 = [];
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        if (product[i].cart) {
          product[i].cart = false;
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
  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...product];

    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredItems(updatedList);
  };
 
  cartItems();

  return (
    <Navbar className="bg-body-tertiary navbar_background" sticky='top'>
      <Container>
        <Navbar.Brand><FcShop size={35}></FcShop></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <AiOutlineSearch size={25}></AiOutlineSearch>
          <Nav className="me-auto">
            <AnchorLink href="#course" style={{ textDecoration: "none" }}>
              <Form.Control type="text" placeholder="Search" onChange={filterBySearch} onClick={()=>setSelectedFilters([])} className={`${x ? 'navbar_LineWhite' : 'navbar_Lineblack'} navbar_Search shadow-none`} onMouseEnter={() => setX(true)} onMouseLeave={() => setX(false)} />
            </AnchorLink>
            
          </Nav>
          <Nav>
            <NavDropdown  title={<Badge badgeContent={cartNumber}><BsCart size={25}></BsCart></Badge>} id="navbarScrollingDropdown" drop='start' show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
            <div
              ref={divRef}
              style={{
                minHeight: '100px',
                height: '300px',//ha cartcontent.length kisebb mint 3 auto ha nagyobb 300px
                width: '100%',
                overflow: 'auto'
              }}>
              {cartcontent.map(item => <NavDropdown.Item key={item.id} className='cartContent'>
                <Row>
                  <Col><Image className='cart_product_image' src={require("./pictures/" + item.image)} alt={item.name}></Image></Col>
                  <Col xs={6}><p className='cartContentStyle'><span className='cartText'>{item.name}</span> <span className='cartContentText'>{item.number}x</span></p><p className='cartContentPrice'>{item.price} Ft </p></Col>
                  <Col xs={2} className='cartIcon'>
                    <IconButton onClick={() => { rmvCart(item.id); cartSum(); }}>
                      <BsCartDash></BsCartDash>
                    </IconButton>
                  </Col>
                </Row>
                <NavDropdown.Divider />
              </NavDropdown.Item>
              )}
            </div>
              <NavDropdown.Item>VÉGÖSSZEG: {cartTotal} Ft</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>setOpen(true)}> <AiOutlineArrowRight></AiOutlineArrowRight>Kosár tartalma</NavDropdown.Item>
            </NavDropdown>
            <Nav>
            
            <Toggle
              defaultChecked={isDark}
              icons={{
                checked: "🌙",
                unchecked: "🔆",
              }}
              onChange={({ target }) => setIsDark(target.checked)} />
            </Nav>
          </Nav>
          <ReactModal isOpen={open} className='product_modal cart_modal' ariaHideApp={false}>
            <Row >
              <Col>
              </Col>
              <Col>
                <IconButton onClick={()=>setOpen(false)} className='product_modal_close'><AiOutlineClose size={35}></AiOutlineClose></IconButton>
              </Col>
            </Row>
            {cartcontent.map(item=> <Row key={item.id} className='cart_modal_row'>
              <Col xs={2}>
              <Image className='cart_modal_image' src={require("./pictures/" + item.image)} alt={item.name}></Image>
              </Col>
              <Col xs={6}>{item.name}</Col>
              <Col xs={2}>
                <IconButton><CiCircleMinus /></IconButton>
                {item.number}
                <IconButton><CiCirclePlus /></IconButton>
              </Col>
              <Col xs={2}>{item.price} Ft</Col>
              <hr></hr>
            </Row>
              )}
              <Row className='cart_bottom_row'>asd</Row>
          </ReactModal>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}
