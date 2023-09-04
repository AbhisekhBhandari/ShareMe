import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data';


const Feed = () => {
  const [loading , setLoading]= useState(true);
  const [pins, setPins] =useState();
  const {categoryId} = useParams(null)
  useEffect(()=>{
    setLoading(true);
    if(categoryId){
      console.log('insede fun');
      const query = searchQuery(categoryId);
      client.fetch(query).then(data=>{
        setPins(data);
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery).then(data=>{
        setPins(data);
        console.log('feed fetching again');

        setLoading(false);
      })
    }

  },[categoryId])

  if(loading) return <Spinner message = "We are adding new ideas to your Feed"/>
  if(!pins?.length) return <h2>No pins available</h2>
  return (
    <div>
      {pins && <MasonryLayout pins = {pins}/>}
    </div>
  )
}

export default Feed
