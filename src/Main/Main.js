import React from 'react';
import {Link} from "react-router-dom";
const Main = () => {
    return (
        <div>
            Index
            <p><Link to={"/member"}>멤버</Link></p>
            <p><Link to={'/adminindex/app'}>인덱스</Link></p>
        </div>
    );
};

export default Main;