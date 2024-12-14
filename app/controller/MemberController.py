from flask import request, jsonify
from app import db, response
from app.model.member import Member


def tambahMember():
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form
        
        nama_wilayah = data.get('nama_wilayah')

        if not nama_wilayah:
            return response.badRequest([], "Kolom nama_wilayah wajib diisi.")

        if len(nama_wilayah) < 3 or len(nama_wilayah) > 100:
            return response.badRequest([], "Nama wilayah harus antara 3 hingga 100 karakter.")

        newMember = Member(
            nama_wilayah=nama_wilayah
        )
        db.session.add(newMember)
        db.session.commit()
        return response.created({'id': newMember.id}, 'Member berhasil dibuat!')
    except Exception as e:
        return response.badRequest([], f"Gagal membuat member: {str(e)}")


def ambilMembers():
    try:
        members = Member.query.all()
        memberList = [
            {
                'id': member.id,
                'nama_wilayah': member.nama_wilayah,
                'waktu_bergabung': member.waktu_bergabung,
                'updated_at': member.updated_at
            }
            for member in members
        ]
        return response.success({'members': memberList})
    except Exception as e:
        return response.badRequest([], f"Gagal mengambil data member: {str(e)}")


def ambilMemberBerdasarkanId(id):
    try:
        member = Member.query.get(id)
        if not member:
            return response.notFound([], "Member tidak ditemukan")
        
        memberData = {
            'id': member.id,
            'nama_wilayah': member.nama_wilayah,
            'waktu_bergabung': member.waktu_bergabung,
            'updated_at': member.updated_at
        }
        return response.success({'member': memberData})
    except Exception as e:
        return response.badRequest([], f"Gagal mengambil data member: {str(e)}")


def memperbaruiMember(id):
    data = request.get_json() if request.is_json else request.form
    try:
        member = Member.query.get(id)
        if not member:
            return response.notFound([], "Member tidak ditemukan")

        member.nama_wilayah = data.get('nama_wilayah', member.nama_wilayah)
        
        db.session.commit()

        return response.success({'id': member.id, 'message': 'Member berhasil diperbarui!'})
    except Exception as e:
        return response.badRequest([], f"Gagal memperbarui member: {str(e)}")


def hapusMember(id):
    try:
        member = Member.query.get(id)
        if not member:
            return response.notFound([], "Member tidak ditemukan")

        db.session.delete(member)
        db.session.commit()

        return response.success({'id': member.id, 'message': 'Member berhasil dihapus!'})
    except Exception as e:
        return response.badRequest([], f"Gagal menghapus member: {str(e)}")

