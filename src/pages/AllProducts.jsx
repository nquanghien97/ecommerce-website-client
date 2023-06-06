import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { paginationServices } from '../api/pagination'
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { Box, Checkbox, CircularProgress, FormControl, FormLabel, FormGroup, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import WishListIcon from '../components/common/WishListIcon';

const useStyles = makeStyles({
  loading: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    marginTop: '70px',
    '@media (max-width: 1050px)' : {
      marginTop: '117px',
    },
    '@media (max-width: 768px)' : {
      flexDirection: 'column',
    }
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 12px',
  },
  formControl: {
    margin: '12px 0'
  },
  formFilter: {
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)' : {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%'
    }
  },
  line: {
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
    '@media (max-width: 768px)' : {
      display: 'none'
    }
  },
})

function AllProducts() {

  const classes = useStyles();

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filterGender, setFilterGender] = useState({gender: []});
  const [filterCategory, setFilterCategory] = useState({category: []});
  const [filterType, setFilterType] = useState({type: []});

  const goToProduct = (id) => {
    navigate(`/product/${id}`)
  }

  const WishList = useSelector((state) => state._todoProduct.WishList)

  const handleChangePagination = (e, numberPage) => {
    setPage(numberPage)
  }
  const onFilterGenderChange = (e) => {
    const checked = e.target.checked;
    let updatedSelectedGenders = [...filterGender.gender];

    if (checked) {
      updatedSelectedGenders.push(e.target.value);
    } else {
      updatedSelectedGenders = updatedSelectedGenders.filter((gender) => gender !== e.target.value);
    }
    setFilterGender({gender: updatedSelectedGenders})
  }

  const onFilterCategoryChange = (e) => {
    const checked = e.target.checked;
    let updatedSelectedCategory = [...filterCategory.category];

    if (checked) {
      updatedSelectedCategory.push(e.target.value);
    } else {
      updatedSelectedCategory = updatedSelectedCategory.filter((category) => category !== e.target.value);
    }
    setFilterCategory({category: updatedSelectedCategory})
  }

  const onFilterTypeChange = (e) => {
    const checked = e.target.checked;
    let updatedSelectedType = [...filterType.type];

    if (checked) {
      updatedSelectedType.push(e.target.value);
    } else {
      updatedSelectedType = updatedSelectedType.filter((type) => type !== e.target.value);
    }
    setFilterType({type: updatedSelectedType})
  }

  useEffect(() => {
    setLoading(true);
    try{
      const fetchProducts = async () => {
        const res = await paginationServices(page, 8,{...filterGender , ...filterCategory, ...filterType})
        setData(res.data)
        setLoading(false);
      }
      fetchProducts()
    }catch (err) {
      console.log(err);
    }
  }, [filterCategory, filterGender, filterType, page])

  if(loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    )
  }
  // if(data.product?.length === 0) {
  //   return (
  //     <Box style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
  //       <Typography>Không có sản phẩm phù hợp</Typography>
  //     </Box>
  //   )
  // }  
  return (
    <Box className={classes.container}>
      <Box className={classes.formContainer}>
        <Box style={{margin: '8px'}}>
          <Typography style={{fontSize: '32px'}}>Filter</Typography>
        </Box>
        <Box className={classes.formFilter}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Gender</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onFilterGenderChange}
                  checked={filterGender.gender.includes('male')}
                />
              }
              label="Male"
              value="male"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onFilterGenderChange}
                  checked={filterGender.gender.includes('female')}
                />
              }
              label="Female"
              value="female"
            />
          </FormControl>
          <Box className={classes.line}></Box>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Category</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onFilterCategoryChange}
                  checked={filterCategory.category.includes('clothes')}
                />
              }
              label="Clothes"
              value="clothes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onFilterCategoryChange}
                  checked={filterCategory.category.includes('shoes')}
                />
              }
              label="Shoes"
              value="shoes"
            />
          </FormControl>
          <Box className={classes.line}></Box>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Type</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onFilterTypeChange}
                  checked={filterType.type.includes('children')}
                />
              }
              label="Children"
              value="children"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onFilterTypeChange}
                  checked={filterType.type.includes('sport')}
                />
              }
              label="Sport"
              value="sport"
            />
          </FormControl>
          <Box className={classes.line}></Box>
        </Box>
      </Box>
      {data.product?.length === 0 ? (
        <Box style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant="h3">Không có sản phẩm phù hợp</Typography>
        </Box>
      ): (
        <Container>
          <Wrapper>
            <Title>All Products</Title>
            <Content>
              {data.product?.map((item) => (
                <ProductContainer
                  key={item._id}
                  onClick={() => goToProduct(item._id)}
                >
                  <Top>
                    <ImageWrapper>
                      <Image src={item.imageUrl} alt={item.name} />
                    </ImageWrapper>
                    <Price>{Number(item.price).toLocaleString('en-US')}đ</Price>
                    <Icon
                      onClick={(e) => {e.stopPropagation()}}
                    >
                      <WishListIcon item={item} liked={WishList ? WishList.filter(like => like._id === item._id).length > 0 ? true : false : false} />
                    </Icon>
                  </Top>
                  <Bottom>
                    <Name>{item.name}</Name>
                    <Description>{item.description}</Description>
                    <Status>{item.status}</Status>
                  </Bottom>
                </ProductContainer>
              ))}
            </Content>
          </Wrapper>
          <PaginationWrapper>
            <Pagination
              onChange={handleChangePagination}
              page={page}
              count={data?.totalPages}
              color="primary"
            />
          </PaginationWrapper>
        </Container>
      )}
    </Box>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Wrapper = styled.div`
  max-width: 1280px;
`

const Title = styled.h1`
  text-align: center;
  margin: 8px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25.00%);
  ${mobile({
    gridTemplateColumns: '50% 50%'
  })}
`

const ProductContainer = styled.div`
  border: 1px solid transparent;
  cursor: pointer;
  margin: 4px;
  padding: 4px;
  &:hover {
    border: 1px solid
  }
`

const Top = styled.div`
  position: relative;
`

const ImageWrapper = styled.div`

`

const Image = styled.img`
  width: 100%;
`

const Price = styled.div`
  position: absolute;
  bottom: 0;
  left: 4px;
  background-color: white;
  padding: 4px;
`

const Bottom = styled.div`
  padding: 8px;
`

const Icon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`

const Name = styled.div`

`

const Description = styled.div`

`

const Status = styled.div`

`

const PaginationWrapper = styled.div`
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default AllProducts