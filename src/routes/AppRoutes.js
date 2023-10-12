import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
const AppRoutes = () => {
  return (
    
    <BrowserRouter>
            <Routes>
              {/* <Route path="/404" element={<NotFound />} /> In case when we want to Navigate to 404 */}
              <Route path="/*" element={<Home/>} />
            </Routes>
         </BrowserRouter>
    
)};

export default AppRoutes;
