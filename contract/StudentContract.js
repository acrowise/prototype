'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// student specifc classes
const Student = require('./student.js');
const StudentList = require('./studentlist.js');

// course specifc classes
const Course = require('./course.js');
const CourseList = require('./courselist.js');


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
    //student has //order is as follows (registererId, studentId, name, term, crs, gpa, registeredCourses, completedCourses)
    async register(ctx,registererId, studentId, courseId) {

        // Retrieve course and student
    
        let student = await ctx.studentList.getStudent(studentId);
        let course = await ctx.courseList.getStudent(courseId);

        // half load rubric
        if (student.getGpa() < 2 && student) {
            throw new Error('student is below 2 gpa, can not register more than 13 crs');
        }

        // First buy moves state from ISSUED to TRADING
        if (paper.isIssued()) {
            paper.setTrading();
        }

        // Check paper is not already REDEEMED
        if (paper.isTrading()) {
            paper.setOwner(newOwner);
        } else {
            throw new Error('Paper ' + issuer + paperNumber + ' is not trading. Current state = ' +paper.getCurrentState());
        }

        // Update the paper
        await ctx.paperList.updatePaper(paper);
        return paper;
    }

    /**
     * Redeem commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} redeemingOwner redeeming owner of paper
     * @param {String} redeemDateTime time paper was redeemed
    */
    async redeem(ctx, issuer, paperNumber, redeemingOwner, redeemDateTime) {

        let paperKey = CommercialPaper.makeKey([issuer, paperNumber]);

        let paper = await ctx.paperList.getPaper(paperKey);

        // Check paper is not REDEEMED
        if (paper.isRedeemed()) {
            throw new Error('Paper ' + issuer + paperNumber + ' already redeemed');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        if (paper.getOwner() === redeemingOwner) {
            paper.setOwner(paper.getIssuer());
            paper.setRedeemed();
        } else {
            throw new Error('Redeeming owner does not own paper' + issuer + paperNumber);
        }

        await ctx.paperList.updatePaper(paper);
        return paper;
    }

}

module.exports = StudentContract;
