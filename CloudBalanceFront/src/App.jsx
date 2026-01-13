import "./styles/index.css";
import Routing from "./layout/Routing";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./redux/slice/authSlice";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();//used just for eslint warn remove 
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);
  return (
    <div>
      <Toaster position="top-right"/>
      <Routing />
    </div>
  );
}

export default App;
