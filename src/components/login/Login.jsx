import { useState } from "react";
import "./login.css"; 
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth,db } from "../../lib/firebase";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null, 
        url:""
    })

    const handleAvatar = (e) =>{
        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0], 
            url: URL.createObjectURL(e.target.files[0])
        })
    }
  }; 

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target); 

    //     const {username, email, password} = Object.fromEntries(formData);

    //     try{

    //         const res = await createUserWithEmailAndPassword(auth,email,password)

    //         await setDoc(doc(db,"users",res.user.uid), {
    //             username,
    //             email
    //             id: res.user.uid, 
    //             blocked: []

    //      });

    //         await setDoc(doc(db,"users",res.user.uid), {
    //         chats: [], 
    //      }); 

    //     toast.success("Account created! You can login now!")
    //     }catch(err){
    //         console.log(err)
    //         toast.error(err.message)
    //     }
    // };
    
    const handleLogin = e => {
        e.preventDefault();
    };

    return( <div className="login">
        <div className="item">
            <h2>Wellcome back,</h2>
             <form onSubmit={handleLogin}> 
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button>Sign In</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Create an Account</h2>
             <form> {/*onSubmit={handleRegister}> */}
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload an image</label>
                <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button>Sign In</button>
            </form>
        </div>
    </div> 
  ); 
}; 

export default Login; 