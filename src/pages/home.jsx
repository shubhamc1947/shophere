// import logo from './logo.svg';

import CategoryWiseProduct from '../components/categorywiseproduct/categorywiseproduct';
import FooterQuickLinks from '../components/footerquicklinks/footerquicklinks';
import Corousel from '../components/corousel/corousel';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

export default function Home() {
    return (
        <>
            <div>
                <ToastContainer position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                    limit={3} />
                <Corousel />
                <CategoryWiseProduct />
                <FooterQuickLinks />
            </div>
        </>
    )
}