from flask import jsonify, request
from app import db, response
from app.model.history import History

def get_history():
    try:
        histories = History.query.all()
        
        result = [
            {
                "id": history.id,
                "timestamp": history.timestamp,
                "waste_type": history.waste_type,
                "accuracy": float(history.accuracy)
            } for history in histories
        ]
        
        return jsonify(result)
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data riwayat")


def delete_history(history_id):
    try:
        history = History.query.get_or_404(history_id)
        
        db.session.delete(history)
        db.session.commit()
        
        return response.success('Sukses menghapus riwayat!')
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal menghapus data riwayat")
