import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import RecipesIndex from "./pages/RecipesIndex";
import UpdateRecipe from "./pages/UpdateRecipe";
// import DeleteRecipe from './pages/DeleteRecipe';
import ShowRecipe from "./pages/ShowRecipe";
import { AuthenticationGuard } from "./components/AuthenticationGuard/AuthenticationGuard";
import About from "./pages/About/About";
import Atlas from "./pages/Atlas/Atlas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<RecipesIndex />} />
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
  );
}

export default App;
