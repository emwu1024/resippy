import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import RecipesIndex from "./pages/RecipeIndex/RecipesIndex";
import UpdateRecipe from "./pages/UpdateRecipe";
// import DeleteRecipe from './pages/DeleteRecipe';
import ShowRecipe from "./pages/ShowRecipe/ShowRecipe.tsx";
import { AuthenticationGuard } from "./components/AuthenticationGuard/AuthenticationGuard";
import About from "./pages/About/About";
import Atlas from "./pages/Atlas/Atlas";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipesIndex />} />
        {/* I don't think the line of code below is necessary? */}
        {/* <Route path="/recipes" element={<Navigate to="/posts" />} /> */}
        <Route path="/recipes/search" element={<RecipesIndex />} />
        <Route
          path="/recipes/create"
          element={<AuthenticationGuard component={CreateRecipe} />}
        />
        <Route path="/recipes/edit/:id" element={<UpdateRecipe />} />
        <Route path="/recipes/:id" element={<ShowRecipe />} />
        <Route path="/about" element={<About />} />
        <Route path="/atlas" element={<Atlas />} />
        {/* <Route path="/recipes/delete/:id" element={<DeleteRecipe />} /> */}
      </Routes>
    </div>
  );
}

export default App;
