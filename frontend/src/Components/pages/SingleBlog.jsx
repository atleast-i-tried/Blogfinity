import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const { mode, user, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setBlog(data.blog);
      } catch (error) {
        setBlog({});
        console.log(error);
      }
    };
    getSingleBlog();
  }, []);
  if (!isAuthenticated) {
    alert("To access this content , please Login");
    return <Navigate to={"/"} />;
  }
  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog && (
        <section className="container">
          <div className="category">{blog.category}</div>
          <h1>{blog.title}</h1>
          <div className="writer_section">
            <div className="author">
              <img src={blog.authorAvatar} alt="author_avatar" />
              <p>{blog.authorName}</p>
            </div>
          </div>
          <div className="firstsec">
            {blog && blog.mainImage && (
              <img
                src={blog.mainImage.url}
                alt="mainBlogImg"
                className="mainImg"
              />
            )}
            <p className="intro-text">{blog.intro}</p>
          </div>

          <div className="sub-para">
            <div className="fst">
              <h3>
                {blog.paraOneTitle}</h3>
                <p>{blog.paraOneDescription}</p>
              
            </div>
            <div className="snd">
              {" "}
              {blog && blog.paraOneImage && (
                <img src={blog.paraOneImage.url} alt="paraOneImg" />
              )}
            </div>
          </div>
          <div className="sub-para">
            <div className="fst">  {blog && blog.paraTwoImage && (
              <img src={blog.paraTwoImage.url} alt="paraOneImg" />
            )}</div>
            <div className="snd">  <h3>{blog.paraTwoTitle}</h3> 
            <p>{blog.paraThreeDescription}</p></div>
          </div>
          <div className="sub-para">
            <div className="fst"> <h3>{blog.paraThreeTitle}</h3>
            <p>{blog.paraThreeDescription}</p></div>
            <div className="snd">    
            {blog && blog.paraThreeImage && (
              <img src={blog.paraThreeImage.url} alt="paraOneImg" />
            )}</div>
       
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBlog;
