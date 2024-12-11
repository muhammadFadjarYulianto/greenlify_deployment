"""Menambah model articles dan comments

Revision ID: 421c6e91a13f
Revises: 4aec3be9e577
Create Date: 2024-12-07 10:55:45.072159

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text
from datetime import datetime

# revision identifiers, used by Alembic.
revision = '421c6e91a13f'
down_revision = '4aec3be9e577'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'articles',
        sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column('created_by', sa.BigInteger(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('img_file', sa.Text(), nullable=True),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('views', sa.Integer(), nullable=False, default=0),
        sa.Column('author', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True, default=datetime.utcnow),
        sa.Column('updated_at', sa.DateTime(), nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow),
        sa.ForeignKeyConstraint(['created_by'], ['admins.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table(
        'comments',
        sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column('id_article', sa.BigInteger(), nullable=False),
        sa.Column('username', sa.String(length=150), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('comment', sa.Text(), nullable=False),
        sa.Column('is_approved', sa.Boolean(), nullable=True, default=False),
        sa.Column('status', sa.Enum('PENDING', 'APPROVED', 'REJECTED', name='statusenum'), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True, default=datetime.utcnow),
        sa.Column('updated_at', sa.DateTime(), nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow),
        sa.ForeignKeyConstraint(['id_article'], ['articles.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    bind = op.get_bind()
    bind.execute(
        text("""
        INSERT INTO articles (created_by, title, content, img_file, created_at, updated_at)
        VALUES 
        (1, 'Keuntungan Menggunakan Tas Kain Katun Organik', 'Tas kain berbahan katun organik, ideal untuk menggantikan kantong plastik saat berbelanja.', 'https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', :created_at, :updated_at),
        (1, 'Manfaat Alat Makan Kompos', 'Set alat makan berbahan kompos, cocok untuk penggunaan sekali pakai tanpa merusak lingkungan.', 'https://images.pexels.com/photos/4397820/pexels-photo-4397820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', :created_at, :updated_at),
        (1, 'Wadah Biodegradable: Solusi Ramah Lingkungan', 'Wadah makanan berbahan biodegradable, aman untuk lingkungan dan dapat terurai secara alami.', 'https://images.pexels.com/photos/12725408/pexels-photo-12725408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', :created_at, :updated_at)
        """),
        {"created_at": datetime.now(), "updated_at": datetime.now()}
)


    bind.execute(
        text("""
        INSERT INTO comments (id_article, username, email, comment, is_approved, status, created_at, updated_at)
        VALUES
        (1, 'Budi', 'budi@gmail.com', 'Tas kain ini sangat praktis dan ramah lingkungan, saya suka sekali!', TRUE, 'APPROVED', :created_at, :updated_at),
        (2, 'Siti', 'siti@gmail.com', 'Alat makan kompos ini sangat bermanfaat dan bagus untuk lingkungan.', TRUE, 'APPROVED', :created_at, :updated_at),
        (3, 'Andi', 'andi@gmail.com', 'Wadah biodegradable ini sangat berguna untuk menyimpan makanan dengan aman.', TRUE, 'APPROVED', :created_at, :updated_at)
        """),
        {"created_at": datetime.now(), "updated_at": datetime.now()}
    )


def downgrade():
    op.drop_table('comments')
    op.drop_table('articles')
