import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects, Certificates } from "./pages";
import { MusicProvider } from "./context/MusicContext";
import MusicButton from "./components/MusicButton";

const App = () => {
  return (
    <MusicProvider>
      <main className="bg-slate-300/20">
        <Router>
          <Navbar />

          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact"      element={<Contact />} />
          </Routes>

          <Footer />
        </Router>

        <MusicButton />
      </main>
    </MusicProvider>
  );
};

export default App;