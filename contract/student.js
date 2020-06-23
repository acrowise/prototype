
'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate commercial paper state values
const studentState = {
    enrolled: 1,
    registered: 2,
    updatedMarks: 3,
    graduated: 4  
};

/**
 * Student class extends State class
 * Class will be used by application and smart contract to define a student
 */
class Student extends State {

    constructor(obj) {
        super(Student.getClass(), [obj.studentId, obj.name]); //the state in ledger-api
        Object.assign(this, obj);
        //order is as follows (registererId, studentId, name, term, crs, gpa, registeredCourses, completedCourses)
    }

    /**
     * Basic getters and setters
    */
    getStudentId() {
        return this.studentId;
    }

    setStudentId(newStudentId) {
        this.studentId = newStudentId;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    getGpa() {
        return this.gpa;
    }
    setGpa(newGpa) {
        this.gpa = newGpa;
    }

    getCrs() {
        return this.crs;
    }
    setCrs(newCrs) {
        this.crs = newCrs;
    }

    getRegistererId() {
        return this.registererId;
    }

    setRegistererId(newRegistererId) {
        this.registererId = newRegistererId;
    }

    setTerm(termNumber){
        this.term = termNumber;
    }
    getTerm(){
        return this.term ;
    }


    addCompletedCourse(course){
        this.completedCourses.push(course);
    }
    addRegisteredCourse(course){
        this.registeredCourses.push(course);
    }

    getCompletedCourse(){
        return this.completedCourses;
    }
    getRegisteredCourses(){
        return this.registeredCourses;
    }

    getRegisteredCrs(){
        totalRegisteredCrs = 0;
        for (i = 0; i < registeredCourses.length; i++) {

            totalRegisteredCrs += registeredCourses[i].getCrs();
        }


        return totalRegisteredCrs;
    }


    /**
     * Useful methods to encapsulate commercial paper states
     */
    setEnrolled() {
        this.currentState = studentState.enrolled;
    }

    setRegistered() {
        this.currentState = studentState.registered;
    }

    setUpdatedMarks() {
        this.currentState = studentState.updatedMarks;
    }

    setGraduated() {
        return this.currentState = studentState.graduated;
    }


    isEnrolled() {
        return this.currentState === studentState.enrolled;
    }

    isRegistered() {
        return this.currentState === studentState.registered;
    }

    isUpdatedMarks(){
        return this.currentState === studentState.updatedMarks;
    }
    isGraduated(){
         return this.currentState === studentState.graduated;
    }
    

    static fromBuffer(buffer) {
        return Student.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Student);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createStudent(registererId, studentId, name) {
        return new Student({ registererId, studentId, name, 1, 0, 0, [], [] });
    }
    //order (registererId, studentId, name, term, crs, gpa, registeredCourses, completedCourses)

    static getClass() {
        return 'org.papernet.commercialpaper';
    }
}

module.exports = Student;