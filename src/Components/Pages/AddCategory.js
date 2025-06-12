import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name_TR: "",
    name_EN: "",
    is_Active: false,
    is_New: false,
    is_Drink: false,
    sortOrder: 0,
    imagePath: null, // Mevcut resim yolu
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCategory(id);
    }
  }, [id]);

  // Kategori verisini API'den getir
  const fetchCategory = async (id) => {
    try {
      const response = await axios.get(
        `https://api.mazina.com.tr/api/Category/${id}`
      );
      let categoryData = response.data;

      // API'den gelen `sortOrder` içindeki noktayı virgüle çevir
      if (categoryData.sortOrder) {
        categoryData.sortOrder = categoryData.sortOrder
          .toString()
          .replace(".", ",");
      }

      setCategory(categoryData);
    } catch (error) {
      console.error("Kategori bilgisi alınırken hata oluştu:", error);
    }
  };

  // Input değişimini ele al
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === "sortOrder") {
      // Noktayı virgüle çevir
      newValue = value.replace(".", ",");

      // Sadece sayı ve virgül olmasına izin ver (örneğin: "7,3" veya "15")
      if (!/^[0-9,]*$/.test(newValue)) return;
    }

    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  // Resim seçimi
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Kategori kaydet (Ekle veya Güncelle)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name_TR", category.name_TR);
      formData.append("name_EN", category.name_EN);
      formData.append("is_Active", category.is_Active);
      formData.append("is_New", category.is_New);
      formData.append("is_Drink", category.is_Drink);

      // Virgül içeren string formatında API'ye gönder
      formData.append("sortOrder", category.sortOrder.toString());

      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      if (id) {
        // Güncelleme işlemi
        await axios.put(
          `https://api.mazina.com.tr/api/Category/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Kategori başarıyla güncellendi.");
      } else {
        // Ekleme işlemi
        await axios.post("https://api.mazina.com.tr/api/Category", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Kategori başarıyla eklendi.");
      }

      navigate("/category-list");
    } catch (error) {
      console.error("Kategori kaydedilirken hata oluştu:", error);
    }
  };

  return (
    <div className="page-content category-form">
      <h2>{id ? "Kategori Güncelle" : "Kategori Ekle"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name_TR"
          placeholder="Ad (TR)"
          value={category.name_TR}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="name_EN"
          placeholder="Ad (EN)"
          value={category.name_EN}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <div className="mb-4">
          <label>Gösterim Durumu</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="is_Active"
              checked={category.is_Active}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Aktif</label>
          </div>
        </div>
        <div className="mb-4">
          <label>Yeni Kategori Mi?</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="is_New"
              checked={category.is_New}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Evet</label>
          </div>
        </div>
        <div className="mb-4">
          <label>İçecek Kategorisi mi?</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="is_Drink"
              checked={category.is_Drink}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Evet</label>
          </div>
        </div>

        <div className="mb-4">
          <label>Gösterim Sırası</label>
          <input
            type="text"
            className="form-control"
            name="sortOrder"
            value={category.sortOrder}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label>Resim Yükle</label>
          {/* Mevcut resim gösterimi */}
          {category.imagePath && !selectedImage && (
            <div className="mb-3">
              <img
                src={`https://api.mazina.com.tr/${category.imagePath}`}
                alt="Kategori"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
          <input
            type="file"
            name="file"
            onChange={handleImageUpload}
            className="form-control mb-2"
          />
          {selectedImage && (
            <p>
              Yeni seçilen resim: <b>{selectedImage.name}</b>
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          {id ? "Güncelle" : "Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
