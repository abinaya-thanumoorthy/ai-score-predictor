import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    prev_month: "",
    rolling_avg_3: "",
    same_month_last_year: "",
    completion_rate: "",
  });

  const [predictedScore, setPredictedScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
  };

  const validateInputs = () => {
    const values = Object.values(formData);

    if (values.some((value) => value === "")) {
      return "All fields are required.";
    }

    for (let key in formData) {
      const num = Number(formData[key]);

      if (num < 0 || num > 100) {
        return "All input values must be between 0 and 100.";
      }
    }

    return "";
  };

  const handlePredict = async () => {
    setError("");
    setPredictedScore(null);

    const validationError = validateInputs();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        prev_month: Number(formData.prev_month),
        rolling_avg_3: Number(formData.rolling_avg_3),
        same_month_last_year: Number(formData.same_month_last_year),
        completion_rate: Number(formData.completion_rate),
      });

      setPredictedScore(response.data.predicted_score);
    } catch (err) {
      setError("Prediction failed. Ensure FastAPI backend is running.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        fontFamily: "Arial, sans-serif",
        padding: "0",
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "40% 60%",
          overflow: "hidden",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#0f172a",
            color: "white",
            padding: "78px 70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              marginBottom: "18px",
              fontWeight: "bold",
            }}
          >
            AI Score Predictor
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.9",
              fontSize: "15px",
              maxWidth: "500px",
            }}
          >
            Forecast operational or manufacturing performance scores using
            historical metrics, machine learning, and predictive analytics.
          </p>

          <div style={{ marginTop: "42px" }}>
            <h3
              style={{
                marginBottom: "15px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Input Metrics
            </h3>

            <ul
              style={{
                color: "#cbd5e1",
                lineHeight: "2.3",
                fontSize: "15px",
                paddingLeft: "22px",
              }}
            >
              <li>Previous Month Score</li>
              <li>3-Month Rolling Average</li>
              <li>Same Month Last Year</li>
              <li>Completion Rate</li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            padding: "62px 70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "#f8fafc",
          }}
        >
          <h2
            style={{
              marginBottom: "18px",
              color: "#0f172a",
              fontSize: "28px",
              fontWeight: "bold",
              lineHeight: "1.3",
            }}
          >
            Predict Current Score
          </h2>

          {[
            ["prev_month", "Previous Month Score"],
            ["rolling_avg_3", "3-Month Rolling Average"],
            ["same_month_last_year", "Same Month Last Year"],
            ["completion_rate", "Completion Rate"],
          ].map(([name, label]) => (
            <div key={name} style={{ marginBottom: "18px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {label}
              </label>

              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label} (0-100)`}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "14px",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  background: "white",
                  outline: "none",
                }}
              />
            </div>
          ))}

          <button
            onClick={handlePredict}
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "#0f172a",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            {loading ? "Predicting..." : "Predict Score"}
          </button>

          {/* ERROR */}
          {error && (
            <p
              style={{
                color: "#dc2626",
                marginTop: "12px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )}

          {/* RESULT */}
          <div
            style={{
              marginTop: "18px",
              minHeight: "100px",
            }}
          >
            {predictedScore !== null && (
              <div
                style={{
                  padding: "14px",
                  background: "white",
                  borderRadius: "16px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                }}
              >
                <h3
                  style={{
                    color: "#475569",
                    marginBottom: "4px",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Predicted Current Month Score
                </h3>

                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    lineHeight: "1.1",
                  }}
                >
                  {predictedScore}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}