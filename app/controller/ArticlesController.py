from flask import request
from app.model.articles import Articles
from app.model.admins import Admins
from app.model.comments import Comments, StatusEnum
from app import response, db
import re

def indexArticles():
    try:
        articles = Articles.query.all()
        data = formatArray(articles)
        return response.success(data)
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data artikel.")

def formatArray(datas):
    return [singleArticle(data) for data in datas]

def singleArticle(data):
    return {
        'id': data.id,
        'title': data.title,
        'content': data.content,
        'views': data.views,
        'author': data.author,
        'created_by': data.admin.name,
        'img_file': data.img_file,
        'created_at': data.created_at,
        'updated_at': data.updated_at
    }

def singleComment(comment):
    return {
        'id_comment': comment.id,
        'username': comment.username,
        'email': comment.email,
        'comment': comment.comment,
        'status': comment.status.value,
        'is_approved': comment.is_approved,
        'created_at': comment.created_at
    }

def detailArticle(id):
    try:
        article = Articles.query.filter_by(id=id).first()
        if not article:
            return response.notFound([], 'Artikel tidak ditemukan.')

        article.views += 1
        db.session.commit()

        start = request.args.get('start', default=1, type=int)
        limit = request.args.get('limit', default=4, type=int)

        query_approved = Comments.query.filter_by(id_article=id, status=StatusEnum.APPROVED)
        total_approved = query_approved.count()

        query = Comments.query.filter_by(id_article=id, status=StatusEnum.APPROVED)

        total_data = query.count()

        if start < 1 or limit < 1:
            return response.badRequest([], "Parameter 'start' dan 'limit' harus lebih besar dari 0.")

        comments = query.offset(start - 1).limit(limit).all()

        pagination_comment = {
            'success': True,
            'start_index': start,
            'per_page': limit,
            'total_data': total_data,
            'total_approved': total_approved,
            'results': [{
                'id': comment.id,
                'username': comment.username,
                'email' : comment.email,
                'comment': comment.comment,
                'created_at': comment.created_at
            } for comment in comments]
        }

        base_url = f"http://127.0.0.1:5000/api/article/{id}/guest"
        filter_query = f"start={start}&limit={limit}"

        if start > 1:
            previous_start = max(1, start - limit)
            pagination_comment['previous'] = f"{base_url}?{filter_query}&start={previous_start}"
        else:
            pagination_comment['previous'] = None

        if start + limit <= total_data:
            next_start = start + limit
            pagination_comment['next'] = f"{base_url}?{filter_query}&start={next_start}"
        else:
            pagination_comment['next'] = None

        return response.success({
            'article': {
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'views': article.views,
                'author': article.author,
                'created_by': article.admin.name,
                'created_at': article.created_at,
                'updated_at': article.updated_at
            },
            'pagination_comment': pagination_comment
        })
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil detail artikel dengan komentar.")

def detailArticleManage(id):
    try:
        article = Articles.query.filter_by(id=id).first()
        if not article:
            return response.notFound([], 'Artikel tidak ditemukan.')

        return response.success(singleArticle(article))
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil detail artikel.")

def tambahArticle():
    try:
        title = request.form.get('title') or request.json.get('title')
        content = request.form.get('content') or request.json.get('content')
        created_by = request.form.get('created_by') or request.json.get('created_by')
        author = request.form.get('author') or request.json.get('author')
        img_file = request.form.get('img_file') or request.json.get('img_file')

        if not title or not created_by:
            return response.badRequest([], "Kolom title dan created_by wajib diisi.")

        admin = Admins.query.filter_by(id=created_by).first()
        if not admin:
            return response.notFound([], "Admin ID tidak valid.")

        article = Articles(
            title=title,
            content=content,
            created_by=created_by,
            author=author,
            img_file=img_file
        )

        db.session.add(article)
        db.session.commit()
        return response.created([], "Sukses menambahkan artikel.")
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.serverError([], "Gagal menambahkan artikel.")

def tambahCommentForArticle(id):
    try:
        username = request.form.get('username') or request.json.get('username')
        email = request.form.get('email') or request.json.get('email')
        comment = request.form.get('comment') or request.json.get('comment')

        if not all([username, comment]):
            return response.badRequest([], "Kolom username dan comment wajib diisi.")

        article = Articles.query.filter_by(id=id).first()
        if not article:
            return response.notFound([], "Artikel tidak ditemukan.")

        new_comment = Comments(
            id_article=id,
            username=username,
            email=email,
            comment=comment,
            is_approved=False,
            status=StatusEnum.PENDING
        )

        db.session.add(new_comment)
        db.session.commit()
        return response.created([],"Sukses menambahkan komentar")

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.serverError([], "Gagal menambahkan komentar.")

def ubahArticle(id):
    try:
        article = Articles.query.filter_by(id=id).first()
        if not article:
            return response.notFound([], "Artikel tidak ditemukan.")

        created_by = request.form.get('created_by') or request.json.get('created_by')
        title = request.form.get('title') or request.json.get('title')
        content = request.form.get('content') or request.json.get('content')
        author = request.form.get('author') or request.json.get('author')
        img_file = request.form.get('img_file') or request.json.get('img_file')

        if not all([created_by, title, author]):
            return response.badRequest([], "Kolom created_by, title, dan author wajib diisi.")
        
        if not re.match(r'^[a-zA-Z0-9 ]*$', title):
            return response.badRequest([], "Judul tidak boleh mengandung karakter khusus.")
        
        if len(title) < 3 or len(title) > 255:
            return response.badRequest([], "Judul harus antara 3 hingga 255 karakter.")
        
        if content and (len(content) < 10 or len(content) > 2000):
            return response.badRequest([], "Konten harus antara 10 hingga 2000 karakter.")

        if len(author) < 3 or len(author) > 100:
            return response.badRequest([], "Nama penulis harus antara 3 hingga 100 karakter.")

        article.created_by = created_by
        article.title = title
        article.content = content
        article.author = author
        article.img_file = img_file

        db.session.commit()

        return response.success(singleArticle(article))
    
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.serverError([], "Gagal mengubah data artikel.")

def hapusArticle(id):
    try:
        article = Articles.query.filter_by(id=id).first()
        if not article:
            return response.notFound([], "Artikel tidak ditemukan.")

        db.session.delete(article)
        db.session.commit()
        return response.success("Artikel berhasil dihapus.")
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.serverError([], "Gagal menghapus artikel.")

def paginateAndFilterArticles():
    try:
        start = request.args.get('start', default=1, type=int)
        limit = request.args.get('limit', default=4, type=int)
        keyword = request.args.get('keyword', type=str)

        query = Articles.query

        if keyword:
            keyword = f"%{keyword}%"
            query = query.filter(
                Articles.title.ilike(keyword) |
                Articles.author.ilike(keyword)
            )

        latest_article = Articles.query.order_by(Articles.created_at.desc()).first()

        query = query.filter(Articles.id != latest_article.id) if latest_article else query

        total_data = query.count()

        if start < 1 or limit < 1:
            return response.badRequest([], "Parameter 'start' dan 'limit' harus lebih besar dari 0.")

        articles = query.order_by(Articles.created_at.desc()).offset(start - 1).limit(limit).all()

        if not articles:
            return response.notFound([], "Tidak ada artikel yang ditemukan.")

        pagination_data = {
            'success': True,
            'start_index': start,
            'per_page': limit,
            'total_data': total_data,
            'results': formatArray(articles),
        }

        base_url = "http://127.0.0.1:5000/api/article/guest"
        
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

        final_response = {
            'latest_article': formatArray([latest_article]) if latest_article else None,
            'pagination': pagination_data
        }

        return response.success(final_response)

    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data artikel.")

def paginateAndFilterArticlesManage():
    try:
        start = request.args.get('start', default=1, type=int)
        limit = request.args.get('limit', default=4, type=int)
        keyword = request.args.get('keyword', type=str)

        query = Articles.query

        if keyword:
            keyword = f"%{keyword}%"
            query = query.filter(
                Articles.title.ilike(keyword) |
                Articles.author.ilike(keyword)
            )

        total_data = query.count()

        if start < 1 or limit < 1:
            return response.badRequest([], "Parameter 'start' dan 'limit' harus lebih besar dari 0.")

        articles = query.offset(start - 1).limit(limit).all()

        if not articles:
            return response.notFound([], "Tidak ada artikel yang ditemukan.")

        pagination_data = {
            'success': True,
            'start_index': start,
            'per_page': limit,
            'total_data': total_data,
            'results': []
        }

        for article in articles:
            approved_comments_count = Comments.query.filter_by(id_article=article.id, status=StatusEnum.APPROVED).count()
            article_data = singleArticle(article)
            article_data['approved_comments_count'] = approved_comments_count
            pagination_data['results'].append(article_data)

        base_url = "http://127.0.0.1:5000/api/article"
        
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

        final_response = {
            'pagination': pagination_data
        }

        return response.success(final_response)

    except Exception as e:
        print(e)
        return response.serverError([], "Gagal mengambil data artikel.")
