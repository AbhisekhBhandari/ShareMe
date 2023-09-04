
import { useState, useEffect } from "react";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";

import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import {signOut} from '../firebase.js';



const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,anime";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const { userId } = useParams();
  const navigate = useNavigate();



  const signOutFunc = () => {
    try{
    // signOut();
    localStorage.clear();
    navigate("/login");
    }catch(err){
      console.log('Couldnt Sign OUt', err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const query = userQuery(userId);
        const data = await client.fetch(query);
        setUser(data[0]);
      } catch (err) {
        console.log("error fetching user", err);
      }
    };
    fetchUser();
  }, [userId ]);

  useEffect(()=>{
    if(text === 'created'){
      console.log('created');
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then(data=>{
        setPins(data)
      })
    }else{
      console.log('saved');
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then(data=>{
        setPins(data)
      })
    }
  },[text,userId])

  // console.log(user[0]);

  if (!user) return <Spinner message="Loading Profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex  flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full max-h-[300px] 2xl:h-510 shadow-lg object-cover"
              alt="bannerPic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="userPic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.username}
            </h1>
            <div className="absolute top-0 z-1 right-1 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className=" bg-white p-2 flex rounded-full cursor-pointer outline-none shadow-md"
                  onClick={signOutFunc}
                >
                  <AiOutlineLogout color="red" fontSize={21} className="mr-4" />
                  Log Out
                </button>
              )}
            </div>
            <div className="tect-center mb-7">
              <button
                type="button"
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
                onClick={(e) => {
                  setText('created');
                  setActiveBtn("created");
                }}
              >
                Created
              </button>
              <button
              type="button"
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
              onClick={(e) => {
                setText('saved');
                setActiveBtn("saved");
              }}
            >
              Saved
            </button>
            </div>
            {pins?.length ? (<div className="px-2 "><MasonryLayout pins={pins}/></div>): (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2">No Pins found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
