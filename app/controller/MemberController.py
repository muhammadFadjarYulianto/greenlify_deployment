from flask import request, jsonify
from app import db, response
from app.model.member import Member


def tambahMember():
    try:
        desa = request.form.get('desa') or request.json.get('desa')
        rw = request.form.get('rw') or request.json.get('rw')
        rt = request.form.get('rt') or request.json.get('rt')

        if not desa:
            return response.badRequest([], "Kolom desa wajib diisi.")
        if len(desa) < 3 or len(desa) > 100:
            return response.badRequest([], "Nama desa harus antara 3 hingga 100 karakter.")

        if not rw:
            return response.badRequest([], "Kolom rw wajib diisi.")
        if len(rw) < 1 or len(rw) > 3:  
            return response.badRequest([], "Kolom rw harus berupa string dengan panjang 1 hingga 3 karakter.")

        if not rt:
            return response.badRequest([], "Kolom rt wajib diisi.")
        if len(rt) < 1 or len(rt) > 3:  
            return response.badRequest([], "Kolom rt harus berupa string dengan panjang 1 hingga 3 karakter.")

        memberBaru = Member(
            desa=desa,
            rw=rw,
            rt=rt
        )
        db.session.add(memberBaru)
        db.session.commit()
        return response.created([], 'Member berhasil dibuat!')
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal membuat member")

def memperbaruiMember(id):
    desa = request.form.get('desa') or request.json.get('desa')
    rw = request.form.get('rw') or request.json.get('rw')
    rt = request.form.get('rt') or request.json.get('rt')
    try:
        member = Member.query.get(id)
        if not member:
            return response.notFound([], "Member tidak ditemukan")

        if desa:
            if len(desa) < 3 or len(desa) > 100:
                return response.badRequest([], "Nama desa harus antara 3 hingga 100 karakter.")
            member.desa = desa

        if rw:
            if len(rw) < 1 or len(rw) > 3:  
                return response.badRequest([], "Kolom rw harus berupa string dengan panjang 1 hingga 3 karakter.")
            member.rw = rw

        if rt:
            if len(rt) < 1 or len(rt) > 3:  
                return response.badRequest([], "Kolom rt harus berupa string dengan panjang 1 hingga 3 karakter.")
            member.rt = rt

        db.session.commit()
        return response.success('Member berhasil diperbarui!')
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal memperbarui member")

def hapusMember(id):
    try:
        member = Member.query.get(id)
        if not member:
            return response.notFound([], "Member tidak ditemukan")

        db.session.delete(member)
        db.session.commit()

        return response.success('Member berhasil dihapus!')
    except Exception as e:
        print(e)
        return response.serverError([], "Gagal menghapus member")
