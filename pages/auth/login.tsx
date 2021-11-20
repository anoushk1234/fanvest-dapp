import { NextPage } from "next";
import { useContext, useState } from "react";
import { walletContext } from "../../utils/walletContext";
import { supabase } from "../../utils/supabaseClient";
import LoginForm from "../../components/LoginForm";
import Router from 'next/router'


const Login: NextPage = () => {
  const [wallet] = useContext(walletContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = async (publicAddress: string, name: string) => {
    {
      const { data, error } = await supabase
        .from("users")
        .select("public_address");
      data
        ? data.forEach((user: any) => {
            if (user.public_address === publicAddress) {
              setLoggedIn(true);
            }
          })
        : null;
      console.log(data, error, publicAddress);
    }
    {
      if (!loggedIn) {
        const { data, error } = await supabase.from("users").insert(
            {
              public_address: publicAddress,
              name: name,
            },
            { returning: "minimal" }
          );
          console.log(data, error);
          Router.push('/home')
        }else{
          Router.push('/home')
        }
    }
  };

  return <LoginForm handleLogin={handleLogin} wallet={wallet} />;
};
export default Login;
