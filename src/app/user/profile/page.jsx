"use client"
import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectUser, selectLoading, selectError } from '../../features/user/userSlice';


const page = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log(user)
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
        <div>
            <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
         
        </div>
      )}
    </div>
        </div>
    )
}

export default page