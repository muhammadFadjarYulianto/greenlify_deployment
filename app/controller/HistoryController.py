from flask import jsonify, request
from app import db, response
from app.model.history import History
from app.model.products import Products
from sqlalchemy import func
import os


def hapusHistory(id):
    try:
        history = History.query.get_or_404(id)
        
        db.session.delete(history)
        db.session.commit()
        
        return response.success('Sukses menghapus riwayat!')
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal menghapus data riwayat")
    
from sqlalchemy import func
from datetime import datetime

def paginateAndFilterHistoryManage():
    try:
        start = request.args.get('start', default=1, type=int)
        limit = request.args.get('limit', default=3, type=int)

        if start < 1 or limit < 1:
            return response.badRequest([], "Parameter 'start' dan 'limit' harus lebih besar dari 0.")

        today = datetime.today().date()

        query = History.query.order_by(History.timestamp.desc())

        total_data = query.count()

        histories = query.offset(start - 1).limit(limit).all()

        if not histories:
            return response.notFound([], "Tidak ada riwayat yang ditemukan.")

        total_scan = History.query.filter(func.date(History.timestamp) == today).count() 
        total_product = Products.query.count() 
        rerata_accuracy = db.session.query(func.avg(History.accuracy)).scalar() 

        if rerata_accuracy is not None:
            rerata_accuracy = f"{rerata_accuracy * 100:.2f}%"  
        else:
            rerata_accuracy = "0.00%"

        pagination_data = {
            'success': True,
            'start_index': start,
            'per_page': limit,
            'total_data': total_data,
            'total_scan': total_scan,
            'total_product': total_product,
            'rerata_accuracy': rerata_accuracy,
            'results': formatArray(histories),
        }

        base_url = f"{os.getenv('BASE_URL')}api/history"

        if start > 1:
            previous_start = max(1, start - limit)
            previous_query = f"start={previous_start}&limit={limit}"
            pagination_data['previous'] = f"{base_url}?{previous_query}"
        else:
            pagination_data['previous'] = None

        if start + limit <= total_data:
            next_start = start + limit
            next_query = f"start={next_start}&limit={limit}"
            pagination_data['next'] = f"{base_url}?{next_query}"
        else:
            pagination_data['next'] = None


        return response.success(pagination_data)

    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data riwayat.")

def formatArray(histories):
    return [singleHistory(history) for history in histories]

def singleHistory(history):
    return {
        "id": history.id,
        "timestamp": history.timestamp,
        "waste_type": history.waste_type,
        "accuracy": float(history.accuracy)
    }


