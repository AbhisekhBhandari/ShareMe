import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlForImage } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const checkSaved = () => {
    if (!save) {
      return false;
    } else {
      const filter = save?.filter((item) => item.postedBy._id == user.uid);
      return filter.length >= 1;
    }
  };

  const alreadySaved = checkSaved();
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.uid,
            postedBy: {
              _type: "postedBy",
              _ref: user.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          // setSavedArr((prev=>[...,]))
        });
    }
  };
  const deletePin = (id)=>{
    client.delete(id).then(()=>{
      window.location.reload();
    })
  }

  return (
    <div className="m-2 ">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlForImage(image).width(550).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex-col justify-between p-1 pr-0 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image.asset.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-5 h-5 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:first-letter:shadow-md outline-none"
                >
                  {save.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:first-letter:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-4 absolute  bottom-0">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-1 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill/>{destination.slice(12,27)}
                </a>
              )}
            </div>
            {postedBy._id === user.uid && (
              <button
              type="button"
              className="bg-blue-500 p-2 opacity-70 hover:opacity-100 font-bold px-5 py-1 text-dark text-base rounded-3xl hover:first-letter:shadow-md outline-none"
              onClick={(e) => {
                e.stopPropagation();
                deletePin(_id)
              }}
              >
              <AiTwotoneDelete/>
              </button>
            )}
          </div>
        )}
      </div>
      <Link 
      className="flex gap-2 mt-2 items-center"
      to={`user-profile/${postedBy._id}`} >
      <img className = 'w-8 h-8 rounded-full object-cover'
      src= {postedBy.image}
      />
      <p className= 'font font-semibold capitalize'>{postedBy.username}</p>
      </Link>
    </div>
  );
};

export default Pin;
