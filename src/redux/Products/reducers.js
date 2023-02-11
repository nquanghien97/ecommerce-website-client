import {
  GET_ALL_PRODUCT,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
  GET_ALL_CLOTHES,
  GET_ALL_SHOES,
  ADD_WISH_LIST,
  GET_NUMBER_WISH_LIST,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_ERROR
} from  './actions';
 
const initProduct = {
    numberCart:0,
    numberWishList:0,
    Carts:[],
    _products:[],
    _clothes:[],
    WishList:[],
    loading: false,
    error: null,
}
 
export default function todoProduct(state = initProduct, action){
    switch(action.type){
        case FETCH_PRODUCTS_PENDING:
          return {
            ...state,
            loading: true,
          }
        case FETCH_PRODUCTS_ERROR:
          return {
            ...state,
            error: action.error
          }
        case GET_ALL_PRODUCT:
            return{
                ...state,
                _products:action.payload,
                loading: false,
            }
        case GET_ALL_CLOTHES:
            return{
                ...state,
                _clothes:action.payload,
                loading: false,
            }
        case GET_ALL_SHOES:
            return {
                ...state,
                _shoes: action.payload,
                loading: false,
            }
        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            if(state.numberCart===0){
                let cart = {
                    id:action.payload._id,
                    quantity:1,
                    name:action.payload.name,
                    imageUrl:action.payload.imageUrl,
                    price:action.payload.price
                }
                state.Carts.push(cart);
            }
            else{
                let check = false;
                state.Carts.forEach((item,key)=>{
                    if(item.id===action.payload._id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload._id,
                        quantity:1,
                        name:action.payload.name,
                        imageUrl:action.payload.imageUrl,
                        price:action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
               
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
               
                return{
                    ...state
                }
            case DELETE_CART:
                let quantity_ = state.Carts[action.payload].quantity;
                return{
                    ...state,
                    numberCart:state.numberCart - quantity_,
                    Carts:state.Carts.filter(item=>{
                        return item.id!==state.Carts[action.payload].id
                    })
                    
                }
        case ADD_WISH_LIST:
            if(state.numberWishList===0){
                let wishList = {
                    id:action.payload._id,
                    quantity:1,
                    name:action.payload.name,
                    imageUrl:action.payload.imageUrl,
                    price:action.payload.price
                }
                state.WishList.push(wishList);
            }
            else{
                let check = false;
                state.WishList.forEach((item,key)=>{
                    if(item.id===action.payload._id){
                        state.WishList.splice(key,1);
                        check=true;
                    }
                });
                if(!check){
                    let _wishList = {
                        id:action.payload._id,
                        quantity:1,
                        name:action.payload.name,
                        imageUrl:action.payload.imageUrl,
                        price:action.payload.price
                    }
                    state.WishList.push(_wishList);
                }
            }
        return{
            ...state,
            numberWishList: state.WishList.length
        }
        case GET_NUMBER_WISH_LIST:
            return{
                ...state
            }
        default:
            return state;
    }
}
