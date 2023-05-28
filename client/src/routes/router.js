import { createBrowserRouter } from "react-router-dom"
import { Auth } from "../components/Auth";
import { Main } from "../components/Main"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/people',
    element: <Main />
  }
])
