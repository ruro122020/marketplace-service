"""fixed price column in service

Revision ID: 17317b80d325
Revises: 6555964eedc6
Create Date: 2024-03-12 22:29:18.481728

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17317b80d325'
down_revision = '6555964eedc6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_column('price')

    # ### end Alembic commands ###