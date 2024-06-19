import Image from "next/image";
import Search from "./components/Search";
import Packages from "./components/Packages";
import Cabs from "./components/Cabs";
import Destinations from "./components/Destinations";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between p-24">
    <Search/>
    {/* <Destinations/> */}
    <Packages/>
     <Cabs/>
    </main>
  );
}
