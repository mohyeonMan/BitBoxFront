import React from 'react';
import { useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const tt = () =>{
        navigate('/adminindex/app')
    }
    return (
        <div>
            Index
            <button onClick={tt}>
                rr
            </button>
        </div>
    );
};

export default Main;