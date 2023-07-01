import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPageFields } from '../../Constants/FormFields';
import BookHelpers from '../../Bookhelpers';

const fields=addPageFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function Addpage(){
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const bookHelper = new BookHelpers();
    const {id} = useParams();
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            content:content,
            title:title
        }
        const res = await bookHelper.AddPage(id,data);
        if(res.status === 201){
            alert('Page Added Successfully');
            navigate(`/book/${id}`);
        }else{
            const objKeys = Object.keys(res);
            setError(
                objKeys.map((key) => {
                  return (
                    <p style={{ textAlign: "center" }}>
                      {key}: {res[key]}
                    </p>
                  );
                })
              );
        }
    };



    return(
        <div style={{width:"60%",margin:"auto",marginTop:"6rem"}}>
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Add Page
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="text-red-500">{error}</div>

            <div className="-space-y-px">
            <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border 
            border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500" placeholder="title"/>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Title is 
            not required except if you start new chapter</p>
            </div>
            <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <textarea onChange={(e)=>{setContent(e.target.value)}} id="message" rows="4" className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the content here..."></textarea>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800">Add Page</button>
        </form>
      </div>
    )
}