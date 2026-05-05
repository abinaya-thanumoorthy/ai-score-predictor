# AI-Powered Manufacturing Plant Performance Predictor

A machine learning proof of concept that predicts monthly manufacturing plant performance scores using historical operational metrics.

## Features
- Predicts current month plant score
- Uses Linear Regression
- Trained on historical CSV data
- Built with Python, Pandas, Scikit-learn, and Joblib

## Input Metrics
- Previous month score
- 3-month rolling average
- Same month last year
- Completion rate

## Project Structure
ai-score-predictor/
│
├── data/sample_scores.csv
├── train_model.py
├── predict.py
├── score_model.pkl
├── requirements.txt
└── README.md

## How to Run

### Install dependencies
pip install -r requirements.txt

### Train model
python train_model.py

### Predict score
python predict.py

## Sample Output
Predicted Current Month Score: 81

## Future Scope
- FastAPI integration
- Dashboard UI
- Advanced ML models

## Disclaimer
This is a generic manufacturing analytics project built for learning and portfolio purposes.