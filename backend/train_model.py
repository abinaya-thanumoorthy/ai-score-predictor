import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load historical score data
df = pd.read_csv("data/sample_scores.csv")

# Features (inputs)
X = df[["prev_month", "rolling_avg_3", "same_month_last_year", "completion_rate"]]

# Target (output)
y = df["current_month_score"]

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Save trained model
joblib.dump(model, "score_model.pkl")

print("Model trained successfully and saved as score_model.pkl")