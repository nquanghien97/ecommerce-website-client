import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { AddWishList } from '../../redux/Products/actions';
import { openSnackBar } from '../../redux/User/user.actions';

function WishListIcon(props) {

  const { item, liked } = props;

  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.user.isLoggedIn);

  const [like, setLike] = useState(liked)

  useEffect(() => {
    setLike(liked)
  },[liked])
    
  const addWishList = () => {
    if(!isLogin) {
      dispatch(openSnackBar(true))
    } else {
      dispatch(AddWishList(item._id, item));
      setLike(!like)
    }
  }


  return (
    <>
      { like ? 
        <FavoriteIcon className='icon' onClick={addWishList} />
        :
        <FavoriteBorderIcon className='icon' onClick={addWishList} />
      }
    </>
  )
}

export default WishListIcon