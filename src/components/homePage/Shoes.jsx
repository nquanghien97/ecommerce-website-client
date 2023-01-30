import { useEffect } from 'react';
import styled from 'styled-components';
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "react-multi-carousel/lib/styles.css";
import { mobile } from '../../responsive';
import { actFetchShoesRequest, AddWishList } from '../../redux/Products/actions';
import { useSelector, useDispatch } from 'react-redux';

function Shoes() {

  // Slider
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const dispatch = useDispatch()

  const addWishList = (items) => {
    dispatch(AddWishList(items));
  } 

  useEffect(() => {
    const fetchShoes = () =>dispatch(actFetchShoesRequest())
    fetchShoes()
  }, [dispatch])

  const data = useSelector((state) => state._todoProduct._shoes?.product)

  return(
    <Container>
      <TextContainer>
        NEW ARRIVALS
      </TextContainer>
      <Wrapper>
        {data && (
          <Carousel 
            arrows={true}
            showDots={true}
            renderDotsOutside={renderButtonGroupOutside}
            responsive={responsive}>
              {data.map((item) => (
                <div key={item._id}>
                  <Link to={`/product/${item._id}`}>
                    <Slide>
                      <Img src={item.imageUrl} />
                      <TextItem>
                        <Price> {Number(item.price).toLocaleString('en-US')}đ </Price>
                        <Title>{item.name}</Title>
                        <Des>{item.description}</Des>
                        <Status>{item.status}</Status>
                      </TextItem>
                    </Slide>
                  </Link>
                  <Icon>
                    <FavoriteBorderIcon className='icon' onClick={()=> addWishList(item)} />
                  </Icon>
                </div>
              ))}
          </Carousel>
        )}
      </Wrapper>
    </Container>
  )}


const renderButtonGroupOutside = styled.div`
  position: absolute;
  bottom: 0px;
`

const Container = styled.div`
  padding:  0 15px;
  position: relative;
  padding-bottom: 30px;
  ${mobile({padding:0})};
`

const TextContainer = styled.h1`
  padding: 0 20px 5px 5px;
`

const Wrapper = styled.div`
  
`

const Slide = styled.div`
  position: relative;
  margin: 0 10px;
  padding-bottom: 30px;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
      border: 1px solid black;
  }
  ${mobile({margin:0})};
  z-index: 1;
`

const Img = styled.img`
  width: 100%;
`

const Icon = styled.div`
  position: absolute;
  top: 4px;
  right: 16px;
  z-index: 100;
  cursor: pointer;
`

const TextItem = styled.div`
  padding: 0 10px;
`

const Price = styled.p`
  font-size: 20px;
`

const Title = styled.div`

`

const Des = styled.div`
  opacity: 0.8;
`

const Status = styled.div`

`

export default Shoes;
