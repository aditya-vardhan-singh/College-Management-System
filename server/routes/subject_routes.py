from flask import Blueprint, jsonify, request
from models.college import Subject
from utils import Session

bp = Blueprint('subjects', __name__, url_prefix='/subjects')


@bp.route('/get', methods=['GET'])
def get_subjects():
    '''
    DESC: Fetch all subjects from Subject Table
    '''

    # Check arguments
    limit = request.args.get('limit', default=100, type=int)

    try:
        session = Session()
        
        subjects = session.query(Subject).order_by(Subject.id).limit(limit).all()
        subjects_list = [
            {
                'id': subject.id,
                'name': subject.name
            }
            for subject in subjects
        ]
        
        return jsonify({'subjects': subjects_list}), 200
        
    except Exception as e:
        session.rollback()
        return jsonify({'message': 'Error fetching subjects', 'subjects': ''}), 500
        
    finally:
        session.close()
