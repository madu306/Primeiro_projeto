import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

const Detail = () => {
  const {currentUser} = useUserStore();

  const handleDeleteAccount = async () => {
    const email = prompt("Confirme seu email para excluir a conta:", currentUser.email);
    const password = prompt("Digite sua senha:");

    if (!email || !password) return;

    try {
      // 1. Criar credencial para reautenticar
      const credential = EmailAuthProvider.credential(email, password);

      // 2. Reautenticar
      await reauthenticateWithCredential(auth.currentUser, credential);

      // 3. Apagar dados do Firestore
      await deleteDoc(doc(db, "users", currentUser.id));

      // 4. Apagar usuário no Auth
      await deleteUser(auth.currentUser);

      console.log("Conta excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className='detail'>
      <div className="user">
        <img src={currentUser?.avatar || "./avatar.png"} alt="" /> 
        <h2>{currentUser?.username}</h2>
        <p>Dados do perfil</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
          </div>
        </div>
        <div className="option">
          <div className="title"> 
          </div>
        </div>
        <div className="option">
          <div className="title">
          </div>
        </div>
        <button onClick={handleDeleteAccount}>Excluir Conta</button>
        <button className="logout" onClick={()=>auth.signOut()}>Desconectar</button>
      </div>
    </div>
  )
}

export default Detail 