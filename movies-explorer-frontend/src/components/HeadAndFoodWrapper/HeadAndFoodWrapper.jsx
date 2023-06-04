import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";


function HeadAndFoodWrapper ({ children, header = true, footer = true }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {header && <Header />}
      {children}
      {path !== "/profile" && footer && <Footer />}
    </>
  );
};

export default HeadAndFoodWrapper;