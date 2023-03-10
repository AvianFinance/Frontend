import Navbar from "./navbar";
import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import BuyListModal from "./modal/buylistModal";
import RentalListModal from "./modal/rentallistModal";
import ToasterContainer from "./toast"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Wallet_modal />
      
      <BidsModal />
      <BuyModal />
      <BuyListModal/>
      <RentalListModal/>
      <ToasterContainer/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
