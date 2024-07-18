
import Search from "./components/Search";
import Packages from "./components/Packages";
import Cabs from "./components/Cabs";
import 'react-toastify/dist/ReactToastify.css';




export default function Home() {
  return (
       
      <main className="flex min-h-screen flex-col items-center bg-white justify-between p-24">
        <Search />
        <Packages />
        <Cabs />
      </main>
    
     
  
  );
}
