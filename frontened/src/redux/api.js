import axios from "axios";


export const API = axios.create({
    withCredentials: true,
    // baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`
    credentials: 'include'
});

// export const getProducts = (keyword, currentPage, price)=>API.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`);
export const getProducts = (keyword, currentPage, price, category, rating)=>{
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
    if(category){
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
    }
    return(
        API.get(link)
    )

}
export const getProductDetails = (id)=>API.get(`/api/v1/product/${id}`);
export const signIn = (formValue)=>API.post(`/api/v1/login`, formValue);
export const signUp = (formValue)=>API.post(`/api/v1/signup`, formValue, {headers: {"Content-Type": "multipart/form-data"}});
export const loadUser = ()=>API.get(`/api/v1/me`);
export const logout = ()=>API.get(`/api/v1/logout`);
export const updateUserProfile = (updatedFormValue)=>API.put(`/api/v1/update/me`, updatedFormValue);
export const changePassword = (data)=>API.put(`/api/v1/password/update`, data);
export const forgotPassword = (email)=>API.post(`/api/v1/password/forgot`, {email});
export const resetPassword = (data)=>API.put(`/api/v1/password/reset/${data.token}`, data.passwords);
export const createOrder = (order)=>API.post(`/api/v1/order/new`, order);
export const myOrders = ()=>API.get(`/api/v1/orders/me`);
export const getOrderDetails = (id)=>API.get(`/api/v1/order/${id}`);
export const addNewReview = (data)=>API.put(`/api/v1/review`,data);
export const getAllProductsByAdmin = ()=>API.get(`/api/v1/admin/products`);
export const addNewProductByAdmin = (data)=>API.post(`/api/v1/admin/product/new`, data);
export const deleteProductByAdmin = (id)=>API.delete(`/api/v1/admin/product/${id}`);
export const updateProductByAdmin = (id, data)=>API.put(`/api/v1/admin/product/${id}`, data);
export const getAllOrdersByAdmin = ()=>API.get(`/api/v1/admin/orders`);
export const updateOrdersByAdmin = (id, data)=>API.put(`/api/v1/admin/orders/${id}`, data);
export const deleteOrdersByAdmin = (id)=>API.delete(`/api/v1/admin/orders/${id}`);
export const getAllUsersByAdmin = ()=>API.get(`/api/v1/admin/users`);
export const getUserDetailsByAdmin = (id)=>API.get(`/api/v1/admin/user/${id}`);
export const updateUserByAdmin = (id, data)=>API.put(`/api/v1/admin/user/${id}`, data);
export const deleteUserByAdmin = (id)=>API.delete(`/api/v1/admin/user/${id}`);
export const getProductReviews = (productId)=>API.get(`/api/v1/reviews?productId=${productId}`);
export const deleteProductReview = (productId, reviewId)=>API.delete(`/api/v1/reviews?productId=${productId}&id=${reviewId}`);
export const getRelatedTours = (data)=>API.post(`/api/v1/related/products`, data);

