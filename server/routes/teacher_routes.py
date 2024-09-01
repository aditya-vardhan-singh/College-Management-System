from flask import Blueprint, request, jsonify
from utils import Session
from models.college import Teacher

bp = Blueprint('teachers', __name__, url_prefix='/teachers')


@bp.route('/get', methods=['GET'])
def get_teacher():
    '''
    DESC: Fetch all teachers from Teacher Table
    '''
    
    # Check arguments
    
    limit = request.args.get('limit', default=100, type=int)

    try:
        session = Session()
        
        # Get all teachers
        teachers = session.query(Teacher).order_by(Teacher.id).limit(limit).all()
        
        # Convert list of teacher objects to dictionary format
        teachers_list = [
            {
                'id': teacher.id,
                'name': teacher.name,
                'workExperience': teacher.work_experience
            }
            for teacher in teachers
        ]
        
        return jsonify({'message': 'Records found successfully', 'teachers': teachers_list}), 200
    
    except Exception as e:
        session.rollback()
        return jsonify({'message': 'Error fetching recrods', 'teachers': ''}), 500

    finally:
        session.close()


@bp.route('/register', methods=['POST'])
def register_teacher():
    '''
    DESC: Register a new teacher
    '''
    
    # Check arguments
    
    data = request.get_json()
    
    if 'fName' not in data or 'mName' not in data or 'lName' not in data or 'workExperience' not in data:
        return jsonify({'message': 'Name and Work Experience are required'}), 400
    
    try:
        session = Session()
        
        # Create a new teacher object
        name = data['fName'].strip() + (' ' if data['mName'].strip() else '') + data['mName'].strip() + ' ' + data['lName'].strip()
        teacher = Teacher(name=name, work_experience=data['workExperience'])
        
        # Add the new teacher to the session
        session.add(teacher)
        
        # Commit the transaction
        session.commit()
        
        return jsonify({'message': 'Teacher registered successfully'}), 201
    
    except Exception as e:
        session.rollback()
        return jsonify({'message': 'Error registering teacher', 'error': str(e)}), 500

    finally:
        session.close()


@bp.route('/delete', methods=['DELETE'])
def delete_teacher():
    '''
    DESC: Delete a teacher
    '''
    
    # Check arguments
    
    data = request.get_json()
    
    if 'teacherId' not in data:
        return jsonify({'message': 'ID is required'}), 400
    
    try:
        session = Session()
        
        # Get the teacher object to be deleted
        teacher = session.query(Teacher).filter(Teacher.id == data['teacherId']).first()
        
        if teacher:
            # Delete the teacher from the session
            session.delete(teacher)
            
            # Commit the transaction
            session.commit()
            
            return jsonify({'message': 'Teacher deleted successfully'}), 200
        
        else:
            return jsonify({'message': 'Teacher not found'}), 404
    
    except Exception as e:
        session.rollback()
        return jsonify({'message': 'Error deleting teacher', 'error': str(e)}), 500

    finally:
        session.close()


@bp.route('/find', methods=['GET'])
def find_teacher():
    '''
    DESC: Find a teacher by name
    '''
    
    # Check arguments
    
    teacher_id = request.args.get('teacherId')
    
    if not teacher_id:
        return jsonify({'message': 'ID is required'}), 400
    
    try:
        session = Session()
        
        # Get the teacher object by name
        teacher = session.query(Teacher).filter(Teacher.id == teacher_id).one_or_none()
        
        if teacher:
            return jsonify({'message': 'Teacher found successfully', 'teacher': {
                'id': teacher.id,
                'name': teacher.name,
                'workExperience': teacher.work_experience
            }}), 200
        
        else:
            return jsonify({'message': 'Teacher not found'}), 404
    
    except Exception as e:
        session.rollback()
        return jsonify({'message': 'Error finding teacher', 'error': str(e)}), 500

    finally:
        session.close()
