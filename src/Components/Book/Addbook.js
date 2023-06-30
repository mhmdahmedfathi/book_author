import React, {useState } from 'react';
import Input from '../Input/input';
import { useNavigate } from 'react-router-dom';
import { addBookFields } from '../../Constants/FormFields';
import Helpers from '../../helpers';

const fields=addBookFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function Addbook(){
    const [description, setDescription] = useState('');
    const [addBookState, setAddBookState] = useState(fieldsState);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectImage, setSelectImage] = useState(false);
    const navigate = useNavigate();
    const helpers = new Helpers();
    const handleChange = (e) => {
        setAddBookState({ ...addBookState, [e.target.name]: e.target.value });
    };

    const addImage = async (e) => {
        e.preventDefault();
		setSelectedImage(prevstate => { return e.target.files[0] })
        setSelectImage(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (selectImage && !selectedImage.image_url) formData.append("cover", selectedImage);
        
        let BookData = {
            ...addBookState,
            description: description,
            cover : selectedImage
        }
        const res = await helpers.AddBook(BookData);
        if(res.status === 201){
            alert('Book Added Successfully');
            navigate('/dashboard');
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
                    Add Book

                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="text-red-500">{error}</div>

            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={addBookState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                                customClass={field.customcss?field.customcss:''}
                        />
                    
                    )
                }
            </div>
            <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea onChange={(e)=>{setDescription(e.target.value)}} id="message" rows="4" className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
                border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the Description here..."></textarea>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Cover</label>
                <input className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" 
                type="file" onChange={addImage} />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px) but will converted to 382×287px.</p>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    )
}