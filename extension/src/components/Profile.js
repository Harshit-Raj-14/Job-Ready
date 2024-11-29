import React from 'react';
import {MdArrowBack} from "react-icons/md";
import {ROUTES} from "../utils/routes"; 
import { saveData } from '../utils/localStorage';
import {PiUploadFill} from "react-icons/pi";

function Profile({setPage, setOpenAIKey, setResume, resume, openAIKey }) {
  const handleSubmit =(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedResume = formData.get("resume");
    const updatedOpenAIKey = formData.get("openAIKey");
    setResume(updatedResume);
    setOpenAIKey(updatedOpenAIKey);
    saveData('resume', updatedResume);
    saveData('openAIKey', updatedOpenAIKey);
  };

  return (
    <div className="flex flex-col mx-5">
      <div className="flex flex-row justify-between my-3 items-center">
        <h2 className="text-4xl font-bold text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">My Profile</h2>
        <button 
        onClick={() => {setPage(ROUTES.GENERATOR);}}
        className="border MR-[3px] p-4 border-solid border-solid border-gray-600 rounded-[100%] hover:text-white hover:bg-blue-500">
          <MdArrowBack />
        </button>
      </div>

      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="openAIKey"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            YOUR Open AI Key
          </label>
          <input
            id="openAIKey"
            name="openAIKey"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            placeholder="sk-....9876"
            defaultValue={openAIKey}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="resume"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          <button type="submit" class="flex items-center px-5 py-2.5 text-sm font-medium text-center items-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       
         Upload Resume 
         here <PiUploadFill />
   </button>
          </label>
          <textarea
          id="resume"
          name="resume"
          rows={8}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
          placeholder="Enter your resume details here"
          defaultValue={resume}
          >
          </textarea>
        </div>
        <div className="mb-6 text-center">
          <button
          type="submit"
          className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
