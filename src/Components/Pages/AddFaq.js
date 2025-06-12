import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddEditFAQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState({
    question: "",
    answer: "",
    question_en: "",
    answer_en: "",
    question_ar: "",
    answer_ar: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchFaq(id);
    }
  }, [id]);

  const fetchFaq = async (faqId) => {
    try {
      const response = await axios.get(
        `https://localhost:4411/api/Faq/${faqId}`
      );
      setFaqData(response.data);
    } catch (error) {
      console.error("Soru getirilemedi:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!faqData.question_tr) newErrors.question = "Soru gerekli";
    if (!faqData.answer_tr) newErrors.answer = "Cevap gerekli";
    if (!faqData.question_en)
      newErrors.question_en = "Question (English) is required";
    if (!faqData.answer_en)
      newErrors.answer_en = "Answer (English) is required";
    if (!faqData.question_ar)
      newErrors.question_ar = "Question (Arabic) is required";
    if (!faqData.answer_ar) newErrors.answer_ar = "Answer (Arabic) is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (id) {
        await axios.put(`https://localhost:4411/api/Faq/${id}`, faqData);
        alert("Soru başarıyla güncellendi!");
      } else {
        await axios.post("https://localhost:4411/api/Faq", faqData);
        alert("Soru başarıyla eklendi!");
      }
      navigate("/faq-list");
    } catch (error) {
      console.error("Soru kaydedilirken/güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="page-content dark-theme">
      <form onSubmit={handleSubmit} className="add-faq-form">
        <h2>{id ? "Soru Düzenle" : "Yeni Soru Ekle"}</h2>
        <div className="mb-4">
          <label className="form-label">Soru (Türkçe)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Soruyu yazın..."
            name="question"
            value={faqData.question_tr}
            onChange={handleChange}
          />
          {errors.question && (
            <div className="text-danger">{errors.question}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="form-label">Cevap (Türkçe)</label>
          <textarea
            className="form-control"
            placeholder="Cevabı yazın..."
            name="answer"
            value={faqData.answer_tr}
            onChange={handleChange}
          />
          {errors.answer && <div className="text-danger">{errors.answer}</div>}
        </div>
        <div className="mb-4">
          <label className="form-label">Question (English)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Write the question..."
            name="question_en"
            value={faqData.question_en}
            onChange={handleChange}
          />
          {errors.question_en && (
            <div className="text-danger">{errors.question_en}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="form-label">Answer (English)</label>
          <textarea
            className="form-control"
            placeholder="Write the answer..."
            name="answer_en"
            value={faqData.answer_en}
            onChange={handleChange}
          />
          {errors.answer_en && (
            <div className="text-danger">{errors.answer_en}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="form-label">Question (Arabic)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Write the question in Arabic..."
            name="question_ar"
            value={faqData.question_ar}
            onChange={handleChange}
          />
          {errors.question_ar && (
            <div className="text-danger">{errors.question_ar}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="form-label">Answer (Arabic)</label>
          <textarea
            className="form-control"
            placeholder="Write the answer in Arabic..."
            name="answer_ar"
            value={faqData.answer_ar}
            onChange={handleChange}
          />
          {errors.answer_ar && (
            <div className="text-danger">{errors.answer_ar}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Güncelle" : "Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddEditFAQ;
