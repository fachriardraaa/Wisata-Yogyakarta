import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/User/login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const navigate = useNavigate();


  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const res = await axios.post(
        "http://localhost:3001/login",
        {
          email,
          password
        }
      );


      // simpan user yang login
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      setMessage("Login berhasil");
      setMessageType("success");


      // pindah halaman
      navigate("/");


    } catch (err) {


      if(err.response){

        setMessage(
          err.response.data.message
        );

      }else{

        setMessage(
          "Server tidak terhubung"
        );

      }


      setMessageType("error");

    }

  };



  return (

    <div className="authPage">

      <div className="authShell">

        <div className="authHero">


          <div className="authGlass">


            <div className="authCopy">

              <h1 className="authHeading">
                Selamat Datang
              </h1>


              <p className="authSubheading">
                Masuk untuk merencanakan petualanganmu di Yogyakarta.
              </p>


            </div>



            <form 
              onSubmit={handleLogin}
              className="authForm"
            >


              <div className="authField">


                <label className="authLabel">
                  Email
                </label>


                <input

                  className="authInput"

                  type="email"

                  placeholder="Masukkan email"

                  required

                  value={email}

                  onChange={(e)=>{

                    setEmail(e.target.value);

                    setMessage("");

                  }}

                />


              </div>




              <div className="authField">


                <label className="authLabel">
                  Kata sandi
                </label>


                <div className="authInputWrap">


                  <input

                    className="authInput authInputWithToggle"

                    type={
                      showPassword
                      ?
                      "text"
                      :
                      "password"
                    }


                    placeholder="Masukkan kata sandi"

                    required


                    value={password}


                    onChange={(e)=>{

                      setPassword(e.target.value);

                      setMessage("");

                    }}

                  />



                  <button

                    type="button"

                    className="authToggleBtn"

                    onClick={()=>setShowPassword(!showPassword)}

                  >

                    {
                      showPassword
                      ?
                      "Sembunyi"
                      :
                      "Lihat"
                    }


                  </button>


                </div>


              </div>




              {
                message &&

                <div

                  className={
                    messageType==="success"
                    ?
                    "authMessage authMessageSuccess"
                    :
                    "authMessage authMessageError"
                  }

                >

                  {message}

                </div>

              }




              <button

                type="submit"

                className="authPrimaryBtn"

              >

                Masuk

              </button>




              <div className="authBottomText">


                <span>
                  Belum punya akun?
                </span>


                <Link 
                  to="/register"
                  className="authBottomLink"
                >

                  Daftar

                </Link>


              </div>



            </form>



          </div>


        </div>


      </div>


    </div>

  );

}


export default Login;