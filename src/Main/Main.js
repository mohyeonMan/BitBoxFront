import React from 'react';
import { Link} from "react-router-dom";

const Main = () => {
    return (
        <div>
            Index
            <button>
                <Link to={'/adminindex'}>관리자 ㄱ</Link>
            </button>

        </div>
    );
};

export default Main;