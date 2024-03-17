
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt
from .booking import Booking

class User(db.Model, SerializerMixin):
  
  __tablename__ = 'users'

  serialize_rules = ('-services.user', 
                     '-services.bookings'
                     '-_password_hash',
                     '-provider_bookings.provider',
                     '-provider_bookings.consumer',
                     '-consumer_bookings.provider',
                     '-consumer_bookings.consumer')

  __table_args__ = (db.CheckConstraint('length(name) > 3', name='ck_user_name_length'),)

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  username = db.Column(db.String, nullable=False, unique=True)
  email = db.Column(db.String, nullable=False, unique=True)
  image_url = db.Column(db.String)
  _password_hash = db.Column(db.String, nullable=False)

  #relationship with User
  services = db.relationship('Service', back_populates='user', cascade='all, delete-orphan')

  #relationship with bookings
  provider_bookings = db.relationship('Booking', back_populates='provider', foreign_keys=[Booking.provider_id])
  consumer_bookings = db.relationship('Booking', back_populates='consumer', foreign_keys=[Booking.consumer_id])

  @validates('name')
  def validate_name(self, key, name):
    if type(name) == str and len(name) > 3:
      return name
    else:
      raise ValueError('Name must be of type string and more than 3 characters')
    
  @validates('email')
  def validate_email(self, key, email):
    if '@' not in email:
      raise ValueError('Email must be an email address')
    else:
      return email
    
  @validates('_password_hash')
  def validate_password(self, key, _password_hash):
    if len(_password_hash) > 8:
      return _password_hash
    else:
      raise ValueError('password must be more than 8 characters long')

  @hybrid_property
  def password_hash(self):
    raise AttributeError('Password cannot be shown')
  
  @password_hash.setter
  def password_hash(self, password):
    password_hash = bcrypt.generate_password_hash(
      password.encode('utf-8'))
    
    self._password_hash = password_hash.decode('utf-8')

  def authenticate(self, password):
    return bcrypt.check_password_hash(
      self._password_hash, password.encode('utf-8'))
  
