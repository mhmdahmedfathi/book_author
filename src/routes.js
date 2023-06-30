import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './Pages/Signup/Signup';
import LoginPage from './Pages/Login/Login';
import AuthorRoute from './Guard/AuthorRoute';
import HomePage from './Pages/Home/Home';
import DashboardPage from './Pages/Dashboard/Dashboard';
import AddbookPage from './Pages/Book/addBook';
import NotFoundPage from './Pages/NotFound/NotFound';
import BookPage from './Pages/Book/Book';
import AddPage from './Pages/Page/AddPage';
import BookPages from './Pages/Page/BookPages';
function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className=" w-full space-y-8" style={{height:"100%"}}>
    {/* max-w-md */}
     <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            
            <Route path='/dashboard' element={<AuthorRoute/>}>
              <Route exact path='/dashboard/addbook' element={<AddbookPage/>} />
              <Route exact path='/dashboard' element={<DashboardPage/>}/>
              <Route path='/dashboard/:id/addpage' element={<AddPage/>} />
            </Route>

            <Route exact path='/' element={<HomePage/>} />
            <Route path='/:book/:id' element={<BookPages/>} />
            <Route path='/book/:id' element={<BookPage/>} />
            
            <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
