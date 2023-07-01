import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../StateManagment/AuthContext";
import BookHelpers from "../../Bookhelpers";
import Helpers from "../../helpers";
import { useParams } from "react-router-dom";
import "./page.css";
const Pages = () => {
  const [page, setPage] = useState({
    title: "",
    content: "",
  });
  const [editTitle, setEditTitle] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [EditedTitle, setEditedTitle] = useState("");
  const [EditedContent, setEditedContent] = useState("");
  const { login, User, isAuth } = useContext(AuthContext);
  const helpers = new Helpers();
  const bookHelpers = new BookHelpers();
  useEffect(() => {
    const getData = async () => {
      const res = await helpers.Me();
      login(res);
    };
    if (localStorage.getItem("token") && !isAuth) {
      getData();
    }
  }, []);

  const { book, id } = useParams();
  useEffect(() => {
    const getPage = async () => {
      const res = await bookHelpers.GetPage(book, id);
      if (res.status === 200) {
        setPage(res.data.data);
        if (id === "1") {
          document.getElementById("prev").style.display = "none";
        }
        if (id === res.data.count.toString()) {
          document.getElementById("next").style.display = "none";
        }
      } else {
        setPage({
          title: "Page Not Found",
          content: "Page Not Found",
        });
        document.getElementById("next").style.display = "none";
        document.getElementById("prev").style.display = "none";
      }
    };
    getPage();
  }, [User]);

  const AddEditIcon = (item) => {
    if (User && page.author === User.name) {
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
      setEditTitle(true);
    } else if (item === "content") {
      setEditContent(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPage = {
      title: page.title,
      content: page.content,
    };
    const res = await bookHelpers.UpdatePage(book, id, newPage);
    if (res.status === 200) {
      alert("Page Edited Successfully");
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
    } else if (e.target.name === "content") {
      value = EditedContent;
      setEditContent(false);
    }
    setPage({
      ...page,
      [e.target.name]: value,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await bookHelpers.DeletePage(book, id);
    if (res.status === 200) {
      alert("Page Deleted Successfully");
      window.location.href = `/book/${page.book_id}`;
    }
  };

  const handleAdd = async () => {
    window.location.href = `/dashboard/${page.book_id}/addpage`;
  };


  return (
    <>
      <div>
        <div className="return max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href={`/book/${page.book_id}`}>{page.book}</a>
        </div>
        <h2
          style={{ marginTop: "1rem" }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Page {id}
        </h2>

        <br />
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            {page.title && (
              <div className="edit">
                {!editTitle ? (
                  <>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                      {page.title}
                    </h1>
                    {AddEditIcon("title")}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      defaultValue={page.title}
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
            )}
            <div className="edit">
              {!editContent ? (
                <>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    {page.content}
                  </p>
                  {AddEditIcon("content")}
                </>
              ) : (
                <>
                  <textarea
                    defaultValue={page.content}
                    onChange={(e) => setEditedContent(e.target.value)}
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>

                  <button
                    onClick={(e) => handleEdit(e)}
                    name="content"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800"
                  >
                    Save
                  </button>

                  <button
                    onClick={(e) => setEditContent(false)}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm 
                            px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
            <br />
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
              margin: "3rem 0",
            }}
          >
            {User && page.author === User.name ? (
              <>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleAdd}
                >
                  Add Page
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete Page
                </button>
              </>
            ) : null}
          </div>
          <div className="pagination">
            <a
              href={`${parseInt(id) - 1}`}
              id="prev"
              className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Previous
            </a>
            <a
              href={`${parseInt(id) + 1}`}
              id="next"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pages;
