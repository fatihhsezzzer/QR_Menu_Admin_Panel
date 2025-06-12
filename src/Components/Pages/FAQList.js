import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("https://localhost:4411/api/Faq");
      setFaqs(response.data.$values);
    } catch (error) {
      console.error("Sıkça Sorulan Sorular getirilemedi:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu soruyu silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`https://localhost:4411/api/Faq/${id}`);
        fetchFaqs(); // Soruları yeniden yükle
      } catch (error) {
        console.error("Soru silinirken hata oluştu:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-faq/${id}`);
  };

  return (
    <div className="page-content dark-theme">
      <h2>Sıkça Sorulan Sorular</h2>
      <button
        onClick={() => navigate("/add-faq")}
        className="btn btn-primary mb-3"
      >
        Yeni Soru Ekle
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Soru</th>
            <th>Cevap</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <button
                  onClick={() => handleEdit(faq.id)}
                  className="btn btn-warning mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="btn btn-danger ms-3"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FAQList;
