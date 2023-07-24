"""create tables

Revision ID: 82ff23a37fba
Revises: 
Create Date: 2023-07-24 15:56:30.175692

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '82ff23a37fba'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('favoritelists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('interviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('position', sa.String(length=50), nullable=False),
    sa.Column('company', sa.String(length=50), nullable=False),
    sa.Column('location', sa.String(length=100), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('date', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('interviewId', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=500), nullable=False),
    sa.ForeignKeyConstraint(['interviewId'], ['interviews.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('interviewId')
    )
    op.create_table('jobs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('listId', sa.Integer(), nullable=False),
    sa.Column('position', sa.String(length=50), nullable=False),
    sa.Column('location', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.ForeignKeyConstraint(['listId'], ['favoritelists.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('listId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('jobs')
    op.drop_table('comments')
    op.drop_table('interviews')
    op.drop_table('favoritelists')
    op.drop_table('users')
    # ### end Alembic commands ###
