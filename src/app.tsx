import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";

import Report from "./pages/report";
import ChroniclesPage from "./pages/chronicle-page";
import NatureCulturePage from "./pages/nature-culture-page";
import ProfilesPage from "./pages/profiles-page";

const App = () => {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
         <Route element={<Layout />} >
           <Route path="/" element={<Report />} />
           <Route path="cronica" element={<ChroniclesPage />} />
           <Route path="perfiles" element={<ProfilesPage />} />
           <Route path="cultureza" element={<NatureCulturePage />} />
         </Route>
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App

