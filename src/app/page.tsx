import Image from "next/image";
import Footer1 from "./components/Footer1";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import HomePage from "./components/HomePage";

export default function Home() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthProvider>
       
        
        {/* Main content can go here */}
        <main className="min-h-screen">
        <HomePage/>
        </main>
        
        <Footer1 />
        </AuthProvider>
      </CartProvider>
    </AuthProvider>
  );
}
