import joblib
import pandas as pd

# Load trained model
model = joblib.load("score_model.pkl")

# New input with feature names
new_data = pd.DataFrame([{
    "prev_month": 78,
    "rolling_avg_3": 80,
    "same_month_last_year": 75,
    "completion_rate": 92
}])

# Predict
prediction = model.predict(new_data)

print(f"Predicted Current Month Score: {round(prediction[0])}")