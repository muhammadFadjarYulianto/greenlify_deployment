from flask import request
from app import db, response
from app.model.comments import Comments
from app.model.articles import Articles
import re, os

def formatArray(comments):
    return [satuComment(comment) for comment in comments]

def satuComment(comment):
    return {
        'id': comment.id,
        'username': comment.username,
        'email': comment.email,
        'comment': comment.comment,
        'created_at': comment.created_at,
        'updated_at': comment.updated_at
    }

def indexComment():
    try:
        comments = Comments.query.all()
        data = formatArray(comments)
        return response.success(data)
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data komentar.")

def detailComment(id):
    try:
        if not id.isdigit():
            return response.badRequest([], "ID harus berupa angka.")

        comment = Comments.query.filter_by(id=id).first()
        if not comment:
            return response.notFound([], "Komentar tidak ditemukan.")
        return response.success(satuComment(comment))
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil detail komentar.")

def hapusComment(id):
    try:
        if not id.isdigit():
            return response.badRequest([], "ID harus berupa angka.")

        comment = Comments.query.filter_by(id=id).first()
        if not comment:
            return response.notFound([], "Komentar tidak ditemukan.")

        db.session.delete(comment)
        db.session.commit()
        return response.success("Komentar berhasil dihapus.")

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.serverError([], "Gagal menghapus komentar.")

def paginateAndFilterCommentsManage():
    try:
        start = request.args.get('start', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)
        keyword = request.args.get('keyword', type=str)

        if start < 1 or limit < 1:
            return response.badRequest([], "Parameter 'start' dan 'limit' harus lebih besar dari 0.")

        if keyword and len(keyword) > 50:
            return response.badRequest([], "Keyword tidak boleh lebih dari 50 karakter.")

        query = Comments.query.order_by(Comments.created_at.desc())

        if keyword:
            keyword = f"%{keyword}%"
            query = query.filter(
                Comments.username.ilike(keyword) |
                Comments.comment.ilike(keyword)
            )

        total_data = query.count()

        if start < 1 or limit < 1:
            return response.badRequest([], "Parameter 'start' dan 'limit' harus lebih besar dari 0.")

        comments = query.offset(start - 1).limit(limit).all()

        if not comments:
            return response.notFound([], "Tidak ada komentar yang ditemukan.")

        pagination_data = {
            'success': True,
            'start_index': start,
            'per_page': limit,
            'total_data': total_data,
            'results': [satuComment(comment) for comment in comments],
        }

        base_url = f"{os.getenv('BASE_URL')}api/comment"

        filter_query = f"keyword={keyword}" if keyword else ""

        if start > 1:
            previous_start = max(1, start - limit)
            previous_query = f"start={previous_start}&limit={limit}"
            pagination_data['previous'] = f"{base_url}?{previous_query}&{filter_query}" if filter_query else f"{base_url}?{previous_query}"
        else:
            pagination_data['previous'] = None

        if start + limit <= total_data:
            next_start = start + limit
            next_query = f"start={next_start}&limit={limit}"
            pagination_data['next'] = f"{base_url}?{next_query}&{filter_query}" if filter_query else f"{base_url}?{next_query}"
        else:
            pagination_data['next'] = None

        return response.success(pagination_data)

    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data komentar.")
