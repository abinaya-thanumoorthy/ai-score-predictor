from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Create FastAPI app
app = FastAPI()

# Load trained model
model = joblib.load("backend/score_model.pkl")


# Input schema
class ScoreInput(BaseModel):
    prev_month: float
    rolling_avg_3: float
    same_month_last_year: float
    completion_rate: float


# Home route
@app.get("/")
def home():
    return {"message": "AI Score Predictor API is running"}


# Prediction route
@app.post("/predict")
def predict_score(data: ScoreInput):
    
    # Convert input to DataFrame
    input_data = pd.DataFrame([{
        "prev_month": data.prev_month,
        "rolling_avg_3": data.rolling_avg_3,
        "same_month_last_year": data.same_month_last_year,
        "completion_rate": data.completion_rate
    }])

    # Predict
    prediction = model.predict(input_data)

    return {
        "predicted_score": round(prediction[0])
    }