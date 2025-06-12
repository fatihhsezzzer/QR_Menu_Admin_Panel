import React, { useState, useEffect } from "react";
import axios from "axios";

const AllergenManagement = () => {
  const [allergens, setAllergens] = useState([]);
  const [newAllergen, setNewAllergen] = useState({
    name_TR: "",
    name_EN: "",
    file: null,
  });
  const [editAllergen, setEditAllergen] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAllergens();
  }, []);

  const fetchAllergens = async () => {
    try {
      const response = await axios.get(
        "https://api.mazina.com.tr/api/Allergen"
      );
      setAllergens(response.data.$values || []);
    } catch (error) {
      console.error("Alerjenleri getirirken hata oluştu:", error);
    }
  };

  const handleInputChange = (e, type = "new") => {
    const { name, value } = e.target;
    if (type === "new") {
      setNewAllergen({ ...newAllergen, [name]: value });
    } else if (type === "edit") {
      setEditAllergen({ ...editAllergen, [name]: value });
    }
  };

  const handleFileUpload = (e, type = "new") => {
    const file = e.target.files[0];
    if (type === "new") {
      setNewAllergen({ ...newAllergen, file });
    } else if (type === "edit") {
      setEditAllergen({ ...editAllergen, file });
    }
  };

  const addAllergen = async () => {
    try {
      const formData = new FormData();
      formData.append("Name_TR", newAllergen.name_TR);
      formData.append("Name_EN", newAllergen.name_EN);
      if (newAllergen.file) {
        formData.append("File", newAllergen.file);
      }

      await axios.post("https://api.mazina.com.tr/api/Allergen", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewAllergen({ name_TR: "", name_EN: "", file: null });
      fetchAllergens();
    } catch (error) {
      console.error("Alerjen eklerken hata oluştu:", error);
    }
  };

  const updateAllergen = async (id) => {
    try {
      const formData = new FormData();
      formData.append("Name_TR", editAllergen.name_TR);
      formData.append("Name_EN", editAllergen.name_EN);
      if (editAllergen.file) {
        formData.append("File", editAllergen.file);
      }

      await axios.put(
        `https://api.mazina.com.tr/api/Allergen/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setEditAllergen(null);
      setIsEdit(false);
      fetchAllergens();
    } catch (error) {
      console.error("Alerjen güncellerken hata oluştu:", error);
    }
  };

  const deleteAllergen = async (id) => {
    const confirmDelete = window.confirm(
      "Bu alerjeni silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://api.mazina.com.tr/api/Allergen/${id}`);
      fetchAllergens();
    } catch (error) {
      console.error("Alerjen silinirken hata oluştu:", error);
    }
  };

  const startEdit = (allergen) => {
    setEditAllergen(allergen);
    setIsEdit(true);
  };

  return (
    <div className="page-content allergen-management">
      <h2>Alerjen Yönetimi</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad (TR)</th>
            <th>Ad (EN)</th>
            <th>Resim</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {allergens.map((allergen) => (
            <tr key={allergen.allergenID}>
              <td>{allergen.allergenID}</td>
              <td>{allergen.name_TR}</td>
              <td>{allergen.name_EN}</td>
              <td>
                {allergen.imagePath && (
                  <img
                    src={`https://api.mazina.com.tr/${allergen.imagePath}`}
                    alt={allergen.name_TR}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => startEdit(allergen)}
                  className="btn btn-primary"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => deleteAllergen(allergen.allergenID)}
                  className="btn btn-danger ms-3"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Alerjen Ekle */}
      <div className="add-allergen">
        <h3>Alerjen Ekle</h3>
        <input
          type="text"
          name="name_TR"
          placeholder="Alerjen Adı (TR)"
          value={newAllergen.name_TR}
          onChange={(e) => handleInputChange(e, "new")}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="name_EN"
          placeholder="Alerjen Adı (EN)"
          value={newAllergen.name_EN}
          onChange={(e) => handleInputChange(e, "new")}
          className="form-control mb-2"
        />
        <input
          type="file"
          name="file"
          onChange={(e) => handleFileUpload(e, "new")}
          className="form-control mb-2"
        />
        <button onClick={addAllergen} className="btn btn-success">
          Ekle
        </button>
      </div>

      {/* Alerjen Düzenle */}
      {isEdit && editAllergen && (
        <div className="edit-allergen">
          <h3>Alerjen Düzenle</h3>
          <input
            type="text"
            name="name_TR"
            placeholder="Alerjen Adı (TR)"
            value={editAllergen.name_TR}
            onChange={(e) => handleInputChange(e, "edit")}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="name_EN"
            placeholder="Alerjen Adı (EN)"
            value={editAllergen.name_EN}
            onChange={(e) => handleInputChange(e, "edit")}
            className="form-control mb-2"
          />
          <input
            type="file"
            name="file"
            onChange={(e) => handleFileUpload(e, "edit")}
            className="form-control mb-2"
          />
          <button
            onClick={() => updateAllergen(editAllergen.allergenID)}
            className="btn btn-primary"
          >
            Güncelle
          </button>
          <button
            onClick={() => setIsEdit(false)}
            className="btn btn-secondary ms-2"
          >
            İptal
          </button>
        </div>
      )}
    </div>
  );
};

export default AllergenManagement;
