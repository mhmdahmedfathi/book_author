import { useState,useContext, useEffect } from 'react';
import { AuthContext } from '../../StateManagment/AuthContext';
import Helpers from '../../helpers';
import BookHelpers from '../../Bookhelpers';
import Spinner from '../Loading/spinner';
import "./dashboard.css"

export default function Dashboard(){
    const { login,User,isAuth } = useContext(AuthContext);
    const helpers = new Helpers();
    const bookHelpers = new BookHelpers();
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const getData = async()=>{
            const res =  await helpers.Me();
            login(res);
        }                
        if(localStorage.getItem('token') && !isAuth){
            getData()
        }
        const getBooks = async()=>{
            const res = await bookHelpers.Dashboard();
            setBooks(res.data);
            setLoading(false);
        }
        if(User && isAuth){
            getBooks();
        }
    },[User,isAuth])
    
    return(
        loading ? <Spinner/>:
        <div className="dashboard"> 
            {books && books.map((book,index)=>(
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a>
                        {
                            book.cover ? 
                            <img className="rounded-t-lg"  style={{width:"382px",height:"288px"}} src={"http://localhost:8000" + book.cover} alt="img" />
                            :
                            <img className="rounded-t-lg" style={{width:"382px",height:"288px"}} src={"http://localhost:8000/media/images/default.jpg"} alt="img" />
                        }
                    </a>
                    <div className="p-5">
                        <a >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.description}</p>
                        <a href={`/book/${book.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
                ))}
            </div>
    )
}
