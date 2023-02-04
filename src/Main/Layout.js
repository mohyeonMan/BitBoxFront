import Header from './Header';
import './Layout.css'
const Layout = (props) => {
    return (
        <>
            <Header />
            {props.children}
            
        </>
    );
};

export default Layout;
