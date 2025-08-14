import { useState } from "react";
import "./login.css"; 
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth,db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null, 
        url:""
    })

    const [loading, setLoading] = useState(false); 

    const handleAvatar = (e) =>{
        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0], 
            url: URL.createObjectURL(e.target.files[0])
        })
    }
  }; 

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); 

        const {username, email, password} = Object.fromEntries(formData);

        try{

            const res = await createUserWithEmailAndPassword(auth,email,password)

            await setDoc(doc(db,"users",res.user.uid), {
                username,
                email,
                id: res.user.uid, 
                blocked: []
         });

            await setDoc(doc(db,"userchats",res.user.uid), {
                chats: [], 
            });

        toast.success("Account created! You can login now!")
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target); 
        const {email, password} = Object.fromEntries(formData);

        try{
         await signInWithEmailAndPassword(auth, email, password);  
        }catch(err){
                console.log(err)
                toast.error(err.message)
        }
            finally{
                setLoading(false)
            }
    };

    return( <div className="login">
        <div className="item">
            <h2>Login</h2>
             <form onSubmit={handleLogin}> 
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Senha" name="password" />
                <button>Entrar</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>Criar uma conta</h2>
             <form onSubmit={handleRegister}>
                <input type="texto" placeholder="Nome" name="username" />
                <input type="texto" placeholder="Email" name="email" />
                <input type="password" placeholder="Senha" name="password" />
                <button>Entrar</button>
            </form>
        </div>
    </div> 
  ); 
}; 

export default Login; 