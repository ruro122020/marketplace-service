"""add service_id column

Revision ID: 679e16631cd5
Revises: 5ff4507e8b53
Create Date: 2024-03-14 10:51:34.927926

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '679e16631cd5'
down_revision = '5ff4507e8b53'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('service_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_bookings_service_id_services'), 'services', ['service_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_bookings_service_id_services'), type_='foreignkey')
        batch_op.drop_column('service_id')

    # ### end Alembic commands ###