import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext.js';
import Cookie from 'js-cookie';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [valeurInputs, setValeurInputs] = useState({
    name: '',
    address: '',
  });

  const [message, setMessage] = useState('');
  const router = useRouter()
  const { setUser } = useUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValeurInputs({
      ...valeurInputs,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!valeurInputs.name.trim() || !valeurInputs.address.trim()) {
      setMessage('le champ ne peut pas être vide')
    } else {
      setMessage('Données envoyées avec succès !');
      setUser({ ...valeurInputs  });
      // Method Not Allowed
          // const response = await fetch('/api/login', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ ...valeurInputs }),
          // });
          //   console.log(response);

          // if (response.ok) {
          //   setMessage('Logged in successfully!');
          // } else {
          //   setMessage('Failed to log in.');
          // }

      // Cookie.set( 'name', valeurInputs.name, { expires: 7 } )
      // Cookie.set( 'userAdresse', valeurInputs.adresse, { expires: 7 } )

      router.push('home')
    }
  };

  return (
    <>
      <Head>
        <title>Page d'accueil</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}> 
      <div className={`${styles.container}`}>
          <div className={`${styles.heading}`}>Bienvenue sur Le site.Veuillez entrer vos données</div>
          <form className={`${styles.form}`} onSubmit={handleSubmit}>
            <p className={`${styles.message}`}>{message}</p>
            <input
              className={`${styles.input}`}
              type="texte"
              name="name"
              id="name"
              value={valeurInputs.name}
              onChange={handleChange}
              placeholder="Entrer votre nom"
              aria-label="Nom"
            />
            <input
              className={`${styles.input}`}
              type="text"
              name="address"
              id="address"
              value={valeurInputs.address}
              onChange={handleChange}
              placeholder="adresse"
              aria-label="adresse"
            />
            <button className={`${styles.login_button}`}>Soumettre</button>
          </form>
        </div>
          <span className={`${styles.agreement}`}>
            <a href="#">Developped by Spark Numeric</a>
          </span>
      </main>
    </>
  );
}
