import './App.css';
import React, { useState, useEffect } from 'react';
import  axiosClient from './utils/helpers/server'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import swal from 'sweetalert';
import Template1 from './pages/templates/1/template1';
import Template2 from './pages/templates/2/template2';


function App() {
  const [businessSettings, setBusinessSettings] = useState(null);

  useEffect(() => {
    let host = window.location.host
    console.log(host)
    axiosClient.get(`custometemplates/settings/gettemplatesettings?domain=${host}`).then(resp => {
      console.log(resp)
      if(resp.status === 200){
        setBusinessSettings(resp.data.settings)
      }else{
        swal({
            title: "Website not found",
            text: "Please contact to your administrator",
            icon: "warning",
            button: "ok",
        })
      }
    })
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        { businessSettings && businessSettings.theme === 1 ? 
          <Route path="/" element={<Template1 />}>
          </Route>
          :
          <></>
        }
        { businessSettings && businessSettings.theme === 2 ? 
          <Route path="/" element={<Template2 />}>
          </Route>
          :
          <></>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
