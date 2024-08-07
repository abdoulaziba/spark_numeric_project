import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";

const Home = () => {
  const contentRef = useRef();
  const { user } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    // Vérifier si on est côté client et importer html2pdf.js
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((module) => {
        setHtml2pdf(module);
      });
      setIsClient(true);
    }
  }, []);

  const handleDownload = () => {
    if (!html2pdf || !isClient) return;

    const element = contentRef.current;
    const opt = {
      margin: 0.5,
      filename: 'page-contenu.pdf',
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      },
    };

    // Utilisation de la bibliothèque après l'importation dynamique
    html2pdf.default()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.text(
            `Page ${i} of ${totalPages}`,
            pdf.internal.pageSize.width - 20,
            pdf.internal.pageSize.height - 10
          );
        }
      })
      .save();
  };

  if (!user) {
    return null; // Optionnel : Ajoutez une animation de chargement ou un message
  }

  return (
    <div className={`${styles.pdfcontainer}`}>
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
          <p>
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
            Nom : {user.name}
          </p>
          {/* Ajoutez ici tout autre contenu que vous souhaitez inclure */}
        </div>
        <button onClick={handleDownload} className={`${styles.login_button}`}>
          Télécharger en PDF
        </button>
        <span className={`${styles.agreement}`}>
          <a href="#">Developped by Spark Numeric</a>
        </span>
      </div>
    </div>
  );
};

export default Home;
