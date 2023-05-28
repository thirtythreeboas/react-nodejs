import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import styles from './App.module.scss'
function App() {
  return (
    <div className={styles.container}>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
