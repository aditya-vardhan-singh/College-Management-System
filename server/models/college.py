### IMPORTS ###

from sqlalchemy import (
    Integer,
    String,
    ForeignKey, 
    VARCHAR, 
    CHAR,
    Date,
    Boolean
)
from sqlalchemy.orm import (
    Mapped, 
    mapped_column, 
    relationship,
)
from utils import Session, Base


### MODELS ###

class Student(Base):
    __tablename__='student'

    # Student basic details (fields)
    roll_no: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(CHAR(30), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[str] = mapped_column(CHAR(1), nullable=False)
    father_name: Mapped[str] = mapped_column(CHAR(30))
    class_teacher_id: Mapped[int] = mapped_column(Integer, ForeignKey('teacher.id'))

    # Objects
    subjects: Mapped[list['Subject']] = relationship(
        'Subject', 
        secondary= 'student_subject', 
        back_populates='students',
    )

    subject_teachers: Mapped[list['Teacher']] = relationship('Teacher', secondary='student_teacher', back_populates='students')
    class_teacher: Mapped['Teacher'] = relationship('Teacher', back_populates='class_students')


class Subject(Base):
    __tablename__='subject'

    # Subject basic details (fields)
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)

    # Objects
    students: Mapped[list['Student']] = relationship('Student', secondary='student_subject', back_populates='subjects')


class Student_Subject(Base):
    __tablename__='student_subject'

    # Many to many relationship establishment
    student_roll_no: Mapped[int] = mapped_column(Integer, ForeignKey('student.roll_no'), primary_key=True)
    subject_id: Mapped[int] = mapped_column(Integer, ForeignKey('subject.id'), primary_key=True)


class Teacher(Base):
    __tablename__='teacher'

    # Teacher basic details (fields)
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(VARCHAR(30), nullable=False)
    work_experience: Mapped[int] = mapped_column(Integer)
    
    # Objects
    students: Mapped[list['Student']] = relationship('Student', secondary='student_teacher', back_populates='subject_teachers')
    class_students: Mapped[list['Student']] = relationship('Student', back_populates='class_teacher')


class Student_Teacher(Base):
    __tablename__='student_teacher'

    # Many to many relationship establishment
    student_roll_no: Mapped[int] = mapped_column(Integer, ForeignKey('student.roll_no'), primary_key=True)
    teacher_id: Mapped[int] = mapped_column(Integer, ForeignKey('teacher.id'), primary_key=True)


class Attendance(Base):
    __tablename__='attendance'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    student_roll_no: Mapped[int] = mapped_column(Integer, ForeignKey('student.roll_no'), nullable=False)
    mark: Mapped[bool] = mapped_column(Boolean, nullable=False)


class Marks(Base):
    __tablename__='marks'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    marks: Mapped[int] = mapped_column(Integer, nullable=False)
    subject_id: Mapped[int] = mapped_column(Integer, ForeignKey('subject.id'), nullable=False)
    student_roll_no: Mapped[int] = mapped_column(Integer, ForeignKey('student.roll_no'), nullable=False)


# Base.metadata.create_all(engine)


### SESSION OPERATIONS (OPTIONAL) ###