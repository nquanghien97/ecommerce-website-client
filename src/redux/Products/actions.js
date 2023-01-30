import { getAllProducts } from "../../api/productServices";
import { getClothes, getShoes } from "../../api/categoryServices";

export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const GET_ALL_CLOTHES = 'GET_ALL_CLOTHES';
export const GET_ALL_SHOES = 'GET_ALL_SHOES';
export const ADD_WISH_LIST = 'ADD_WISH_LIST';
export const GET_NUMBER_WISH_LIST= 'GET_NUMBER_WISH_LIST';

export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return getAllProducts().then(res => {
            dispatch(GetAllProduct(res.data));
        });
    }
}

export const actFetchShoesRequest = () => {
    return (dispatch) => {
        return getShoes().then(res => {
            dispatch(GetAllShoes(res.data));
        });
    }
}

export const actFetchClothesRequest = () => {
    return (dispatch) => {
        return getClothes().then(res => {
            dispatch(GetAllClothes(res.data));
        });
    }
}

/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload){
    return{
        type:'GET_ALL_PRODUCT',
        payload
    }
}

//*GET_SHOES
export function GetAllShoes(payload){
    return{
        type:'GET_ALL_SHOES',
        payload
    }
}

//*GET_CLOTHES
export function GetAllClothes(payload){
    return{
        type:'GET_ALL_CLOTHES',
        payload
    }
}

//*ADD_WISH_LIST
export function AddWishList(payload){
    return{
        type:'ADD_WISH_LIST',
        payload
    }
}

//*GET_NUMBER_WISH_LIST
export function GetNumberWishList(){
    return{
        type:'GET_NUMBER_WISH_LIST',
    }
}
 
/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type:'GET_NUMBER_CART'
    }
}
 
export function AddCart(payload){
    return {
        type:'ADD_CART',
        payload
    }
}
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}
export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}
 
export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}

