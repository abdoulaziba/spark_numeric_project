import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

const Home = () => {
  const contentRef = useRef();
  const { user } = useUser();
  const router = useRouter();
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((module) => {
        setHtml2pdf(module.default);
      });
    }
  }, []);

  const handleDownload = () => {
    if (!html2pdf) {
      console.error('html2pdf is not loaded yet');
      return;
    }

    const element = contentRef.current;
    const options = {
      margin: 0.5,
      filename: 'page-contenu.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  };

  if (!user) {
    return null; // Optionnel : Nous pouvons ajouter une animation de chargement ou un message (Abdoul Aziz BA)
  }

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          padding: '20px',
          backgroundColor: '#f9f9f9',
          fontFamily: 'fantasy',
          color: 'black',
        }}
      >
        <h1 style={{ color: 'red' }}>Contenu de la page</h1>
        <p>Ceci est le contenu de la page que vous souhaitez télécharger en PDF.</p>
        <p>
          Bien sûr, voici une version plus développée du texte :
          <br />
          Je soussigné(e), {user.name}, né(e) le [Votre Date de Naissance] à {user.address}, de
          nationalité [Votre Nationalité], et actuellement résident(e) à {user.address}, déclare par
          la présente :
          <br />
          <br />
          <strong>Propriété et Détention :</strong>
          <br />
          Je certifie que je suis le propriétaire légitime et actuel de [Description de l'objet, de
          la propriété ou de la situation]. Cette propriété a été acquise légalement le
          [Date d'Acquisition] auprès de [Nom de la Personne ou de l'Entité], conformément aux lois
          et règlements en vigueur.
          <br />
          <br />
          <strong>Engagement de Véracité :</strong>
          <br />
          J'atteste que toutes les informations fournies dans cette déclaration sont exactes et
          véridiques à ma connaissance. Je reconnais que toute fausse déclaration intentionnelle
          pourrait entraîner des conséquences légales.
          <br />
          <br />
          <strong>Documentation Complémentaire :</strong>
          <br />
          Je suis disposé(e) à fournir toute documentation supplémentaire si nécessaire pour appuyer
          cette déclaration. Les documents suivants sont disponibles sur demande : [Liste des
          documents, par exemple, actes de propriété, certificats de garantie, etc.].
          <br />
          <br />
          <strong>Consentement et Autorisation :</strong>
          <br />
          J'autorise [Nom de la Personne ou de l'Entité concernée] à vérifier l'exactitude des
          informations fournies ci-dessus, si besoin est. Cette autorisation est valable jusqu'à ce
          que les obligations en lien avec cette déclaration soient pleinement remplies.
          <br />
          <br />
          <strong>Droits et Obligations :</strong>
          <br />
          Je comprends que cette déclaration peut être utilisée à des fins légales et
          administratives, et je m'engage à notifier immédiatement [Nom de la Personne ou de l'Entité concernée] de tout changement dans les informations fournies.
          <br />
          <br />
          Fait à [Lieu], le [Jour] [Mois] [Année].
          <br />
          <br />
          Signature : ___________________________
          <br />
          Nom : [Votre Nom]
        </p>
        {/* Ajoutez ici tout autre contenu que vous souhaitez inclure */}
      </div>
      <button onClick={handleDownload} style={{ marginTop: '20px' }}>
        Télécharger en PDF
      </button>
    </div>
  );
};

export default Home;
