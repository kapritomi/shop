import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import ReactModal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import { LuFilter } from 'react-icons/lu';

export function ProductsCard({ product, setProducts, setCartTotal, filteredItems, setFilteredItems, selectedFilters, setSelectedFilters }) {
  let filters = ["Nike", "Puma", "Adidas", "Champion"];
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

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
  const handleFilterButtonClick = (selectedCategory)=>{
    if(selectedFilters.includes(selectedCategory)){
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    }
    else{
      setSelectedFilters([...selectedFilters, selectedCategory])
    }
  };
  useEffect(() => {
    filterItems();
  }, [selectedFilters]);
  const filterItems=()=>{
    if(selectedFilters.length>0){
      let tempItems = selectedFilters.map((selectedCategory) =>{
        let temp = product.filter((item) => item.name === selectedCategory)
        return temp;
      });
      setFilteredItems(tempItems.flat());
    }
    else{
      setFilteredItems([...product])
    }
  }
  function modalOpen(id){
    let a =[]
    for (let i = 0; i < product.length; i++) {
      if(product[i].id === id){
          setOpen(true)
          a.push(product[i])
          setModalContent(a)
          console.log(modalContent)
      }
    }
  }

  return (
    <div>
        <Row>
          <Col >
            <div className='Filter_box'>
            <p className='filterText'><LuFilter size={25}></LuFilter>Szűrők</p>
              {filters.map((category, idx) => (
                <button key={idx} onClick={()=> handleFilterButtonClick(category)} className={`button ${selectedFilters?.includes(category) ? "active" : ""}`}>{category}</button> 
              ))}
            </div>
          </Col>
          <Col xs={8}>
            <Container>
              <Row xs={1} md={4}>
                {filteredItems.map(item => <Col key={item.id}>
                  <div className='produccard_background'>
                    <Image className='product_image' src={require("./" + item.image)} alt={item.name} fluid onClick={()=>modalOpen(item.id)}></Image>
                    <p className='name'>{item.name}</p>
                    <p className='price'>{item.price} Ft</p>
                    <IconButton color='error' onClick={() => { likeChange(item.id); }}>
                      {item.like ? <AiFillHeart /> : <AiOutlineHeart />}
                    </IconButton>
                    <IconButton onClick={() => { cartChange(item.id); cartSum(); }}><BsCartPlus></BsCartPlus></IconButton>
                  </div>
                </Col>
                )}

                <ReactModal isOpen={open} className='product_modal'>
                  {modalContent.map(item => 
                  <Row >
                    <Col>
                      <Image className='product_modal_image' src={require("./" + item.image)} alt={item.name} fluid></Image>
                      <p className='product_modal_price'>{item.price} Ft  
                        <IconButton color='error' onClick={() => { likeChange(item.id); }}>
                          {item.like ? <AiFillHeart size={35} /> : <AiOutlineHeart size={35} />} Like
                        </IconButton> 
                        <IconButton onClick={() => { cartChange(item.id); cartSum(); }} >
                          <BsCartPlus size={35}></BsCartPlus> Add to cart
                        </IconButton> 
                      </p>
                    </Col>
                    <Col>
                      <IconButton onClick={()=>setOpen(false)} className='product_modal_close'><AiOutlineClose size={35}></AiOutlineClose></IconButton>
                      <p className='product_modal_title'><u>{item.name}</u></p>
                      <p className='product_modal_content'>Size: XS, S, M, L, XL, XXL, XXL</p>
                      <p className='product_modal_desc'><u>Description:</u> 
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown 
                        printer took a galley of type and scrambled it to make a type 
                        specimen book. It has survived not only five centuries.
                      </p>
                    </Col>
                    </Row>
                    )}
                  </ReactModal>
              </Row>
            </Container>
          </Col>
          <Col></Col>
        </Row>
    </div>
  );
}
