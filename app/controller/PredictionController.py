from flask import Flask, request, jsonify
from app import db, response
from app.model.history import History
import os
import tensorflow as tf
import numpy as np
from PIL import Image


with open('app/new_model.json', 'r') as json_file:
    model_json = json_file.read()
loaded_model = tf.keras.models.model_from_json(model_json)


loaded_model.load_weights('app/new_model.weights.h5')
print("Model and weights loaded successfully.")


class_indices = {
    'cardboard': 0,
    'glass': 1,
    'metal': 2,
    'organic': 3,
    'paper': 4,
    'plastic': 5
}

index_to_label = {v: k for k, v in class_indices.items()}

def prediksi():
    if 'file' not in request.files:
        return response.badRequest([], "Tidak ada file yang diunggah")

    file = request.files['file']
    if file.filename == '':
        return response.badRequest([], "File kosong")

    try:
        image = Image.open(file)

        image = image.convert('RGB')

        image = image.resize((224, 224))

        image = np.array(image) / 255.0

        image = np.expand_dims(image, axis=0)

        prediction = loaded_model.predict(image)
        predicted_index = np.argmax(prediction, axis=-1)[0]
        predicted_label = index_to_label[predicted_index]
        confidence = float(np.max(prediction))

        new_history = History(
            waste_type=predicted_label,
            accuracy=confidence
        )
        db.session.add(new_history)
        db.session.commit()

        return jsonify({
            "prediction": predicted_label,
            "confidence": confidence
        })
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal melakukan prediksi")