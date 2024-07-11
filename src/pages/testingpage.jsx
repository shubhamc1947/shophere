import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function TestingPage() {
  const notify = () => toast.success("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify !</button>
        <ToastContainer limit={3}
          autoClose={1000}
        />
    </div>
  );
}