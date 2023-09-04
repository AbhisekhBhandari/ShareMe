import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Container/Home";
import { fetchUser } from "./utils/fetchUser";
const App = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [authCheck, setAuthCheck] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const authCheckFunc = async () => {
      const user = await fetchUser();
      setAuthCheck(true);
      if (!user) {
        navigate("/login");
      }
    };
    authCheckFunc();
  }, []);

  return (<>
    {authCheck &&
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    }
    </>

  );
};

export default App;
