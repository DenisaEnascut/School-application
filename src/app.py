from flask import Flask, request
from flask_restful import Api, Resource
from flask_oauthlib.provider import OAuth2Provider
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Schimbă asta cu o cheie secretă puternică
oauth = OAuth2Provider(app)
app.config['OAUTH2_PROVIDER_CLIENT_ID_GENERATOR'] = lambda: 'your-client-id'
db = SQLAlchemy(app)

# Modelul pentru client OAuth2
class Client(db.Model):
    id = db.Column(db.String(40), primary_key=True)
    secret = db.Column(db.String(55), nullable=False)
    redirect_uris = db.Column(db.String(255), nullable=False)
    default_scopes = db.Column(db.String(255), nullable=False)

# Modelul pentru grant OAuth2
class Grant(db.Model):
    id = db.Column(db.String(40), primary_key=True)
    user_id = db.Column(db.String(255), nullable=False)
    client_id = db.Column(db.String(40), db.ForeignKey('client.id'), nullable=False)
    code = db.Column(db.String(255), nullable=False)
    redirect_uri = db.Column(db.String(255), nullable=False)
    expires = db.Column(db.DateTime)
    scopes = db.Column(db.String(255), nullable=False)

# Modelul pentru token OAuth2
class Token(db.Model):
    id = db.Column(db.String(40), primary_key=True)
    client_id = db.Column(db.String(40), db.ForeignKey('client.id'), nullable=False)
    user_id = db.Column(db.String(255), nullable=False)
    token_type = db.Column(db.String(40), nullable=False)
    access_token = db.Column(db.String(255), unique=True, nullable=False)
    refresh_token = db.Column(db.String(255), unique=True, nullable=True)
    expires = db.Column(db.DateTime)
    scopes = db.Column(db.String(255), nullable=False)

# Simulare baza de date în memorie
database = {
    "clase": {},
    "student": {},
    "profesori": {},
    "note": {}
}

# Configurare OAuth2
@oauth.clientgetter
def load_client(client_id, request):
    return Client.query.filter_by(id=client_id).first()

@oauth.grantgetter
def load_grant(client_id, code, request):
    return Grant.query.filter_by(client_id=client_id, code=code).first()

@oauth.tokengetter
def load_token(access_token=None, refresh_token=None):
    if access_token:
        return Token.query.filter_by(access_token=access_token).first()
    elif refresh_token:
        return Token.query.filter_by(refresh_token=refresh_token).first()

@oauth.tokensetter
def save_token(token, request):
    db.session.add(Token(
        id=token['id'],
        client_id=token['client']['id'],
        user_id=token['user_id'],
        token_type=token['token_type'],
        access_token=token['access_token'],
        refresh_token=token['refresh_token'] if 'refresh_token' in token else None,
        expires=token['expires'],
        scopes=token['scope']
    ))
    db.session.commit()

# Adaugare configurare JWTManager
jwt = JWTManager(app)

class Clase(db.Model):
    id_clasa = db.Column(db.Integer, primary_key=True)
    nume_clasa = db.Column(db.String(50))
    nume_profesor = db.Column(db.String(50))

class Studenti(db.Model):
    id_student = db.Column(db.Integer, primary_key=True)
    nume_student = db.Column(db.String(50))
    id_clasa = db.Column(db.Integer, db.ForeignKey('clase.id_clasa'))

class Profesori(db.Model):
    id_profesor = db.Column(db.Integer, primary_key=True)
    nume_profesor = db.Column(db.String(50))

class Note(db.Model):
    id_nota = db.Column(db.Integer, primary_key=True)
    id_student = db.Column(db.Integer, db.ForeignKey('studenti.id_student'))
    id_clasa = db.Column(db.Integer)
    valoare_nota = db.Column(db.Integer)

class StudentsResource(Resource):
    def get(self):
        students = Studenti.query.all()
        student_data = []
        for student in students:
            student_data.append({
                'id': student.id_student,
                'name': student.nume_student,
                'class_id': student.id_clasa
            })
        return {"students": student_data}

    def post(self):
        data = request.get_json()
        new_student = Studenti(nume_student=data["name"], id_clasa=data["class_id"])
        db.session.add(new_student)
        db.session.commit()
        return {"message": "Elev adăugat cu succes", "student": {
            'id': new_student.id_student,
            'name': new_student.nume_student,
            'class_id': new_student.id_clasa
        }}, 201

    def put(self, student_id):
        data = request.get_json()

        student = Studenti.query.get(student_id)
        if student is None:
            return {"message": "Elevul nu există"}, 404

        student.nume_student = data["name"]
        student.id_clasa = data["class_id"]
        db.session.commit()

        return {"message": f"Informații actualizate pentru elevul cu id {student_id}"}, 200

    def delete(self, student_id):
        student = Studenti.query.get(student_id)
        if student is None:
            return {"message": "Elevul nu există"}, 404

        db.session.delete(student)
        db.session.commit()

        return {"message": f"Elev șters cu succes", "deleted_student": {
            'id': student_id,
            'name': student.nume_student,
            'class_id': student.id_clasa
        }}, 200

api.add_resource(StudentsResource, '/students')

class ClasseResource(Resource):
    def get(self):
        classes = Clase.query.all()
        class_data = []
        for class_ in classes:
            class_data.append({
                'id': class_.id_clasa,
                'name': class_.nume_clasa
            })
        return {"clase": class_data}

    def post(self):
        data = request.get_json()

        if "name" not in data:
            return {"message": "Numele clasei lipsește"}, 400

        new_class = Clase(nume_clasa=data["name"])
        db.session.add(new_class)
        db.session.commit()

        return {"message": "Clasă adăugată cu succes", "clasa": {
            'id': new_class.id_clasa,
            'name': new_class.nume_clasa
        }}, 201

    def put(self, class_id):
        data = request.get_json()

        class_ = Clase.query.get(class_id)
        if class_ is None:
            return {"message": "Clasa nu există"}, 404

        class_.nume_clasa = data["name"]
        db.session.commit()

        return {"message": f"Informații actualizate pentru clasa cu id {class_id}"}, 200

    def delete(self, class_id):
        class_ = Clase.query.get(class_id)
        if class_ is None:
            return {"message": "Clasa nu există"}, 404

        db.session.delete(class_)
        db.session.commit()

        return {"message": f"Clasă ștearsă cu succes", "deleted_class": {
            'id': class_id,
            'name': class_.nume_clasa
        }}, 200

api.add_resource(ClasseResource, '/clase')

class ProfessorsResource(Resource):
    def get(self):
        professors = Profesori.query.all()
        professor_data = []
        for professor in professors:
            professor_data.append({
                'id': professor.id_profesor,
                'name': professor.nume_profesor
            })
        return {"profesori": professor_data}

    def post(self):
        data = request.get_json()
        new_professor = Profesori(nume_profesor=data["name"])
        db.session.add(new_professor)
        db.session.commit()
        return {"message": "Profesor adăugat cu succes", "profesor": {
            'id': new_professor.id_profesor,
            'name': new_professor.nume_profesor
        }}, 201
    
    def delete(self, professor_id):
        professor = Profesori.query.get(professor_id)
        if professor is None:
            return {"message": "Profesorul nu există"}, 404

        db.session.delete(professor)
        db.session.commit()

        return {"message": f"Profesor șters cu succes", "deleted_professor": {
            'id': professor_id,
            'name': professor.nume_profesor
        }}, 200

class NotesResource(Resource):
    def get(self):
        notes = Note.query.all()
        note_data = []
        for note in notes:
            note_data.append({
                'id': note.id_nota,
                'student_id': note.id_student,
                'clasa_id': note.id_clasa,
                'value': note.valoare_nota
            })
        return {"note": note_data}

    def post(self):
        data = request.get_json()
        new_note = Note(id_student=data["student_id"], id_clasa=data["clasa_id"], valoare_nota=data["value"])
        db.session.add(new_note)
        db.session.commit()
        return {"message": "Notă adăugată cu succes", "note": {
            'id': new_note.id_nota,
            'student_id': new_note.id_student,
            'clasa_id': new_note.id_clasa,
            'value': new_note.valoare_nota
        }}, 201

    def put(self, note_id):
        data = request.get_json()

        note = Note.query.get(note_id)
        if note is None:
            return {"message": "Nota nu există"}, 404

        note.id_student = data["student_id"]
        note.id_clasa = data["clasa_id"]
        note.valoare_nota = data["value"]
        db.session.commit()

        return {"message": f"Informații actualizate pentru nota cu id {note_id}"}, 200
    
    def delete(self, note_id):
        note = Note.query.get(note_id)
        if note is None:
            return {"message": "Nota nu există"}, 404

        db.session.delete(note)
        db.session.commit()

        return {"message": f"Notă ștearsă cu succes", "deleted_note": {
            'id': note_id,
            'student_id': note.id_student,
            'clasa_id': note.id_clasa,
            'value': note.valoare_nota
        }}, 200

api.add_resource(NotesResource, '/note')

if __name__ == "__main__":
    with app.app_context():
        # Crearea tabelelor în baza de date
        db.create_all()
        print("Tabelele au fost create cu succes în baza de date.")

    # Pornirea aplicației Flask
    app.run(debug=True, port=3000)
