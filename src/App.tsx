import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <main className="min-h-screen bg-background font-poppins flex">
      <div className="flex flex-col max-w-screen-lg w-full mx-auto p-4 sm:p-8">
        <Header />
        <Main />
        <Footer />
      </div>
      <Toaster />
      <Analytics />
    </main>
  );
}

export default App;
