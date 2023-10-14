import React, { useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import CreateAddress from "./CreateAddress";
import ProtectedRoute from "./Protected";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartCount";
import { CartDetailsProvider } from "./context/CartDetails";
import { ProductProvider } from "./context/ProductContext";
import { SearchProvider } from "./context/Search";
import { UserAuthContext } from "./context/UserAuth";
import AddressPage from "./pages/AddressPage";
import AddCategory from "./pages/Admin/AddCategory";
import AddProduct from "./pages/Admin/AddProduct";
import AdminProtected from "./pages/Admin/AdminProtected";
import AllProducts from "./pages/Admin/All-Products";
import AllCategories from "./pages/Admin/AllCategories";
import All_orders from "./pages/Admin/All_orders";
import All_users from "./pages/Admin/All_users";
import Dashboard from "./pages/Admin/Dashboard";
import EditCategory from "./pages/Admin/EditCategory";
import EditProduct from "./pages/Admin/EditProduct";
import View_user from "./pages/Admin/View_user";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/Place-Order";
import ProductView from "./pages/Product-view";
import Profile from "./pages/Profile";
import RatingComponent from "./pages/Rating";
import Search_data from "./pages/Search_data";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Socket from "./pages/Socket";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const { getAuthData, authData } = useContext(UserAuthContext);

  useEffect(() => {
    getAuthData();
  }, []);

  return (
    <Router>
      <SearchProvider>
        <CartDetailsProvider>
          <CartProvider>
            <Navbar />
            <main>
              <Switch>
                <ProductProvider>
                  <Route exact path="/">
                    <Home cartOpen={cartOpen} setCartOpen={setCartOpen} />
                  </Route>

                  <Route path="/socket" component={Socket} />
                  <Route path="/search" component={Search_data} />
                  <Route path="/category/:id">
                    <Shop cartOpen={cartOpen} setCartOpen={setCartOpen} />
                  </Route>
                  <Route path="/product/:id">
                    <ProductView
                      cartOpen={cartOpen}
                      setCartOpen={setCartOpen}
                    />
                  </Route>
                  <Route path="/categories" component={Categories} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/verify-msg" component={Verify} />
                  {/* if url is not available load an error page with current url */}
                  <AdminProtected
                    path={"/admin/edit-product/:id"}
                    component={EditProduct}
                  />
                  <AdminProtected
                    path={"/admin/edit-category/:id"}
                    component={EditCategory}
                  />
                  <AdminProtected
                    path={"/add-category"}
                    component={AddCategory}
                  />
                  <ProtectedRoute
                    path={"/add-address"}
                    component={CreateAddress}
                  />
                  <ProtectedRoute path={"/address"} component={AddressPage} />
                  <AdminProtected
                    path={"/admin-categories"}
                    component={AllCategories}
                  />

                  <ProtectedRoute path={"/profile"} component={Profile} />
                  <ProtectedRoute path={"/checkout"} component={Checkout} />
                  <AdminProtected
                    path={"/add-product"}
                    component={AddProduct}
                  />
                  <AdminProtected
                    path="/admin-products"
                    component={AllProducts}
                  />
                  <ProtectedRoute path="/place-order" component={PlaceOrder} />
                  <ProtectedRoute path="/orders" component={Orders} />
                  <ProtectedRoute
                    path="/success-order"
                    component={OrderSuccess}
                  />
                  <ProtectedRoute
                    path="/rating/:id"
                    component={RatingComponent}
                  />
                  <AdminProtected path="/admin-orders" component={All_orders} />
                  <AdminProtected path="/admin-users" component={All_users} />
                  <AdminProtected path="/view-user/:id" component={View_user} />
                  <AdminProtected path="/dashboard" component={Dashboard} />
                </ProductProvider>
              </Switch>
            </main>
          </CartProvider>
        </CartDetailsProvider>
      </SearchProvider>
      <Footer />
    </Router>
  );
}

export default App;
