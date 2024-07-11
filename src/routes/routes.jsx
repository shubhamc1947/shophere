import React from "react";
import { createBrowserRouter} from "react-router-dom";

import Home from "../pages/home";
import TestingPage from "../pages/testingpage";
import App from "../App";
import ErrorPage from "../pages/errorpage";
import SingleProductPage from "../pages/singleproductpage";
import AllProductPage from "../pages/allproductpage";
import ShoppingCartPage from "../pages/shoppingcartpage";
import WishlistPage from "../pages/wishlistPage";
import CheckoutPage from "../pages/checkoutPage";
import ConfirmationPage from "../pages/confirmationPage";
import AuthenticationPage from "../pages/authenticationPage";
import OrderHistoryPage from "../pages/orderHistoryPage";
import OrderHistoryViewPage from "../pages/orderHistoryViewPage";
import ProfilePage from "../pages/profilePage";

const appRoutes = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : "/profile",
        element : <ProfilePage />
      },
      {
        path : "/singleproduct/:id",
        element : <SingleProductPage />
      },
      {
        path : "/shop",
        element : <AllProductPage/>
      },
      {
        path : "/shop/:search",
        element : <AllProductPage/>
      },
      {
        path : "/cart",
        element : <ShoppingCartPage />
      },
      {
        path : "/wishlist",
        element : <WishlistPage />
      },
      {
        path : "/checkout",
        element : <CheckoutPage />
      },
      {
        path : "/confirmation/:orderId",
        element : <ConfirmationPage />
      },
      {
        path : "/history",
        element : <OrderHistoryPage />
      },
      {
        path : "/orderhistory/:orderId",
        element : <OrderHistoryViewPage />
      },
      {
        path : "/testing",
        element : <TestingPage />
      }
    ],
    errorElement : <ErrorPage />
  },
  {
    path : "/login",
    element : <AuthenticationPage />
  }
]);

export default appRoutes;
