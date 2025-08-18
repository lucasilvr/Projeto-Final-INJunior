import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Feedback from "./pages/Feedback";
import Pijamas from "./pages/Pijamas";
import Pijama from "./pages/Pijama";
import Carrinho from "./pages/Carrinho";
import Favoritos from "./pages/Favoritos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/cadastro",
        element: <Cadastro />
      },
      {
        path: "/feedback",
        element: <Feedback />
      },
      {
        path: "/pijamas",
        element: <Pijamas />
      },
      {
        path: "/pijama/:id",
        element: <Pijama />
      },
      {
        path: "/cart",
        element: <Carrinho />
      },
      {
        path: "/favoritos",
        element: <Favoritos />
      },
    ]
  }
])

export default router;