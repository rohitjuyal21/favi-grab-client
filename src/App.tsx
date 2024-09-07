import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="bg-background font-poppins">
      <div className="max-w-screen-lg mx-auto p-8">
        <Header />
        <Main />
      </div>
      <Toaster />
    </main>
  );
}

export default App;
