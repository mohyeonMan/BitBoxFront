import Header from './Header';
import './Layout.css'
const Layout = (props) => {
    return (
        <>
            <p>
                <img src="https://adimg.cgv.co.kr/images/202206/Willvengers/980x80_0627.jpg" alt="윌벤져스" border="0" ></img>
            </p>
            <Header />
            {props.children}
            
        </>
    );
};

export default Layout;
