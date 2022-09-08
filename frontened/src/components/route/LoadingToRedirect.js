import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        }, 1000);

        count === 0 && navigate("/login");
        return ()=> clearInterval(interval);
    }, [count, navigate]);
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center",  textAlign: "center", font: "800 3rem 'Arial Narrow'", width: "100%", height:"80vh"}}>
      <h5>Redirecting you to login page in {count} seconds</h5>
    </div>
  )
}

export default LoadingToRedirect; 