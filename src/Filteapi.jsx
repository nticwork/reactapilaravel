import { useEffect, useState } from "react";
import axios from "axios";

export default function FilteApi() {
  const [p, setP] = useState("");
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecom2-jade.vercel.app/api/filter", {
        params: { p },
      })
      .then((response) => {
        setProduits(response.data);
      })
      .catch(() => {
        setProduits([]);
      });
  }, [p]);

  return (
    <div>
      <h2>Recherche produits</h2>

      <input
        type="text"
        value={p}
        onChange={(e) => setP(e.target.value)}
        placeholder="Rechercher..."
      />

      <table border="1" cellPadding="5" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
          </tr>
        </thead>

        <tbody>
          {produits.length === 0 ? (
            <tr>
              <td colSpan="4">Aucun produit</td>
            </tr>
          ) : (
            produits.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>

                <td>
                  <img
                    src={prod.image}
                    alt={prod.nom}
                    width="80"
                  />
                </td>

                <td>{prod.nom}</td>
                <td>{prod.prix}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
