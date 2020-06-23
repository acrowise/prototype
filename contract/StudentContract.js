'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// student specifc classes
const Student = require('./student.js');
const StudentList = require('./studentlist.js');

// course specifc classes
const Course = require('./course.js');
const CourseList = require('./courselist.js');

const StudentCourse = require('./StudentCourse.js');


/**
 * A custom context provides easy access to list of all Students
 */
class StudentContext extends Context {

    constructor() {
        super();
        // All students are held in a list of students
        this.StudentList = new StudentList(this);
    }

}

/**
 * A custom context provides easy access to list of all courses
 */
class CourseContext extends Context {

    constructor() {
        super();
        // All courses are held in a list of students
        this.CourseList = new CourseList(this);
    }

}

/**
 * Definestudent smart contract by extending Fabric Contract class
 *
 */
class StudentContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('AAST');
    }

    /**
     * Define a custom context for commercial paper
    */
    createContext() {
        return new StudentContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required 
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }


    //createStudent(registererId, studentId, name) 
    async create(ctx,registererId, studentId, name) {

        // create an instance of the paper
        let student = Student.createStudent(registererId, studentId, name);

        // Smart contract, rather than paper, moves paper into ISSUED state
        student.setEnrolled();


        // Add the paper to the list of all similar students in the ledger world state
        await ctx.StudentList.addStudent(student);

        // Must return a serialized student to caller of smart contract
        return student;
    }

    //course has order is as follows (registererId, courseId, name, term, crs, gpa, registeredCourses, completedCourses)
    //student has order is as follows (registererId, studentId, name, term, crs, gpa, registeredCourses, completedCourses)
    //studentCourse has  order (courseId, name, grade, crs, professors)
    async register(ctx,registererId, studentId, courseId) {

        // Retrieve course and student
    
        let student = await ctx.studentList.getStudent(studentId);
        let course = await ctx.courseList.getStudent(courseId);

        // half load rubric
        if (student.getGpa() < 2 && getRegisteredCrs() >= 12) {
            throw new Error('student is below 2 gpa, can not register more than 13 crs');
        }

        // create  a replica of the course asset to store in student's asset
        studentCourse = new StudentCourse(course.getCourseId(),course.getName(), 'U', course.getCreditHours(), course.getProfessors());
        //add this replica to the student asset
        student.addRegisteredCourse(studentCourse);
        //add student asset to registered students in course asset 
        course.addStudent(student);
        // Update course and student blockchains
        await ctx.studentlist.updateStudent(student);
        await ctx.CourseList.updateCourse(course);

        return paper;
    }


    async updateMarks(ctx,professorId, studentId, courseId) {

        // Retrieve course and student
    
        let student = await ctx.studentList.getStudent(studentId);
        let course = await ctx.courseList.getStudent(courseId);
        professors = course.getProfessors();
        // Check if this professor is the one teaching the course
        if (!professors.include(professorId)) {
            throw new Error('professor doesnt teach this course');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        if (paper.getOwner() === redeemingOwner) {
            paper.setOwner(paper.getIssuer());
            paper.setRedeemed();
        } else {
            throw new Error('Redeeming owner does not own paper' + issuer + paperNumber);
        }

        // Update course and student blockchains
        await ctx.studentlist.updateStudent(student);
        await ctx.CourseList.updateCourse(course);

        return student;
    }

}

module.exports = StudentContract;
