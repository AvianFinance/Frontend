import Navbar from "./navbar";
import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import BuyListModal from "./modal/buylistModal";
import RentalListModal from "./modal/rentallistModal"

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <BuyListModal/>
      <RentalListModal/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
