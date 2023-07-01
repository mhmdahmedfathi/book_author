import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../StateManagment/AuthContext";
import BookHelpers from "../../Bookhelpers";
import Helpers from "../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import "./book.css";
const Book = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    file: "",
  });
  const [count, setCount] = useState(0);
  const [editTitle, setEditTitle] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [EditedTitle, setEditedTitle] = useState("");
  const [EditedDescription, setEditedDescription] = useState("");
  const { login, User, isAuth } = useContext(AuthContext);
  const helpers = new Helpers();
  const bookHelpers = new BookHelpers();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await helpers.Me();
      login(res);
    };
    if (localStorage.getItem("token") && !isAuth) {
      getData();
    }
  }, [isAuth]);

  const { id } = useParams();
  useEffect(() => {
    const getBook = async () => {
      const res = await bookHelpers.GetBook(id);
      if (res.status === 200) {
        if (!res.data.cover) {
          res.data.cover = "/media/images/default.jpg";
        }
        setBook(res.data);
        setEditedTitle(res.data.title);
        setEditedDescription(res.data.description);
        setCount(res.data.pages);
      } else {
        navigate("/notfound");
      }
    };
    getBook();
  }, [id]);

  const AddEditIcon = (item) => {
    console.log(User);
    if (User && book.author === User.name) {
      return (
        <svg
          onClick={(e) => handleClick(item)}
          className="icon w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
          <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
        </svg>
      );
    }
  };
  const handleClick = (item) => {
    if (item === "title") {
      console.log("title");
      setEditTitle(true);
    } else if (item === "description") {
      setEditDescription(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title: book.title,
      description: book.description,
      slug: book.slug,
    };
    const res = await bookHelpers.UpdateBook(id, newBook);
    if (res.status === 200) {
      alert("Book Edited Successfully");
      setIsEdited(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsEdited(true);
    let value = "";
    if (e.target.name === "title") {
      value = EditedTitle;
      setEditTitle(false);
    } else if (e.target.name === "description") {
      value = EditedDescription;
      setEditDescription(false);
    }
    setBook({
      ...book,
      [e.target.name]: value,
    });
  };

  const PageNavigation = () => {
    navigate(`/${book.slug}/1`);
  };

  const handleDelete = async () => {
    const res = await bookHelpers.DeleteBook(id);
    if (res.status === 200) {
      alert("Book Deleted Successfully");
      navigate("/");
    }
  };


  return (
    <>
      <div>
        <h2
          style={{ marginTop: "3rem" }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Book Details
        </h2>
        <br />
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            <div className="edit">
              {!editTitle ? (
                <>
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {book.title}
                  </h1>
                  {AddEditIcon("title")}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    defaultValue={book.title}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <button
                    onClick={(e) => handleEdit(e)}
                    name="title"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                                dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => setEditTitle(false)}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm 
                                px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Author : {book.author}
            </p>
            <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
              <div className="edit">
                {!editDescription ? (
                  <>
                    <p>"{book.description}"</p>
                    {AddEditIcon("description")}
                  </>
                ) : (
                  <>
                    <textarea
                      defaultValue={book.description}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                    ></textarea>

                    <button
                      onClick={(e) => handleEdit(e)}
                      name="description"
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                                dark:focus:ring-blue-800"
                    >
                      Save
                    </button>

                    <button
                      onClick={(e) => setEditDescription(false)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm 
                                px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </blockquote>
            <br />
            <img
              style={{ textAlign: "center", margin: "auto" }}
              className="h-auto max-w-lg rounded-lg"
              src={"http://localhost:8000" + book.cover}
              alt="description"
            />
            {isEdited && (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800 Save"
              >
                Save Changes
              </button>
            )}
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            {User && book.author === User.name ? (
              <>
                <button
                  type="button"
                  onClick={()=>navigate(`/dashboard/${book.id}/addpage`)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Page
                </button>
                <button type="button" onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete Book</button>

              </>
            ) : null}
            {(book && (count > 0)) && (
            
            <button
              type="button"
              onClick={PageNavigation}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pages
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
