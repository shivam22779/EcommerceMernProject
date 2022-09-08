import React, {useEffect} from "react";
import Sidebar from "./Sidebar.js";
import "./AdminDashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getProductsByAdmin,
  
} from "../../redux/features/productSlice";
import {getAllOrdersByAdmin} from "../../redux/features/orderSlice"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
  
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllUsersByAdmin } from "../../redux/features/authSlice.js";





ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {products} = useSelector((state)=> ({...state.product}));
  const {allOrders} = useSelector((state)=> ({...state.ordersInfo}));
  const {users, error} = useSelector((state)=> ({...state.auth}));

  let outOfStock = 0;

  products && products.forEach((item)=>{
    if(item.stock === 0){
      outOfStock += 1;
    };
  });

  let totalAmount = 0;
  allOrders && allOrders.forEach((item)=>{
    totalAmount += item.totalPrice;
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(72, 56, 86);"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughtnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
        {
         
          backgroundColor: ["rgb(37, 205, 218)"],
          hoverBackgroundColor: ["rgb(112, 35, 35)"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],

  }

  useEffect(()=>{
    dispatch(getProductsByAdmin());
    dispatch(getAllOrdersByAdmin());
    // dispatch(getAllUsersByAdmin());

  }, [dispatch]);

  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }

  }, [error, alert, dispatch]);

  useEffect(()=>{
    if(!users){
      dispatch(getAllUsersByAdmin());
    }
  }, [dispatch, users]);
        


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{allOrders && allOrders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState}></Line>
        </div>
        <div className="doughtnutChart">
          <Doughnut data={doughtnutState}></Doughnut>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
