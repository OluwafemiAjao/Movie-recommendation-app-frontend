// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import MovieDetails from "./pages/MovieDetails";
// import NotFound from "./pages/NotFound";
// import Navbar from "./components/Navbar";

// export default function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/movie/:id" element={<MovieDetails />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import routes from "./routes/routes.jsx";
// import Navbar from "./components/Navbar.jsx";
import routes from "./routes/routes";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Always visible on every route */}
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;





