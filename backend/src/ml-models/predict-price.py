import json
import sys
import pandas as pd
import xgboost as xgb

def main():
    model = xgb.Booster()
    model.load_model('./src/ml-models/xgb_model.json')

    with open('./src/ml-models/columns_list.json', 'r') as file:
        columns_list = json.load(file)

    input_json = sys.stdin.read()
    features = json.loads(input_json)

    sample_data = pd.DataFrame(columns=columns_list)
    sample_data.loc[0] = 0

    direct_keys = ['year', 'mileage']

    for key, value in features.items():
        if key in direct_keys:
            if key in columns_list:
                sample_data.at[0, key] = value
        else:
            column_name = f"{key}_{value}".lower().replace(' ', '_')
            if column_name in columns_list:
                sample_data.at[0, column_name] = 1

    for column in sample_data.columns:
        if pd.isna(sample_data.at[0, column]):
            sample_data.at[0, column] = 0

    sample_dmatrix = xgb.DMatrix(sample_data)
    prediction = model.predict(sample_dmatrix)
    print(prediction[0])

if __name__ == '__main__':
    main()