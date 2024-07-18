
import "./globals.css";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: "Holiday Tour and Travel",
  description: "Discover the beauty of Kashmir with our exclusive holiday tour and travel services. Offering comfortable and reliable cab services to any destination in Kashmir, we ensure a memorable and hassle-free travel experience. Explore picturesque landscapes, serene valleys, and vibrant culture with our tailored travel packages. Your adventure in paradise begins with us!",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
        
          <Navbar />
          <div className="main"> {children}</div>
       
      </body>
    </html>
  );
}
