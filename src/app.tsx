import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";

import Report from "./pages/report";
import ChroniclesPage from "./pages/chronicle-page";
import NatureCulturePage from "./pages/nature-culture-page";
import ProfilesPage from "./pages/profiles-page";
import BiographyPage from "./pages/biography-page";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top";

const App = () => {
 return (
   <div className="App">
     <BrowserRouter>
     <ScrollToTop />
       <Routes>
         <Route element={<Layout />} >
           <Route path="/" element={<Report />} />
           <Route path="cronica" element={<ChroniclesPage />} />
           <Route path="perfiles" element={<ProfilesPage />} />
           <Route path="cultureza" element={<NatureCulturePage />} />
         </Route>
        <Route path="biography" element={<BiographyPage />} />
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App

