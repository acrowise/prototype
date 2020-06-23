
'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate commercial paper state values
const courseState = {
    created: 1,
    registered: 2,
    updatedStudents: 3,
    ommited: 4  
};

/**
 * Course class extends State class
 * Class will be used by application and smart contract to define a Course */
class Course extends State {

    constructor(obj) {
        super(Course.getClass(), [obj.courseId, obj.adminId]); //the state in ledger-api
        Object.assign(this, obj);
        //order is as follows (registererId, courseId, name, term, crs, gpa, registeredCourses, completedCourses)
    }

    /**
     * Basic getters and setters
    */
    getCourseId() {
        return this.studentId;
    }

    setCourseId(newCourseId) {
        this.courseId = newCourseId;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }


    getAdminId() {
        return this.AdminId;
    }

    setAdminId(newAdminId) {
        this.AdminId = newAdminId;
    }

    setProfessors(professors){
        this.professors = professors;
    }

    getProfessors(){
        return this.professors;
    }

    addStudent(student){
        this.registeredStudents.push(student);
    }

    getStudents(){
        return this.registeredStudents;
    }

    setCreditHour(newCrs){
        this.crs = newCrs;
    }

    getCreditHours(){
        return this.crs;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    setCreated() {
        this.currentState = courseState.created;
    }

    setRegistered() {
        this.currentState = courseState.registered;
    }

    setupdatedStudents() {
        this.currentState = courseState.updatedStudents;
    }

    setommited() {
        return this.currentState = courseState.ommited;
    }


    isCreated() {
        return this.currentState === courseState.created;
    }

    isRegistered() {
        return this.currentState === courseState.registered;
    }

    isUpdated(){
        return this.currentState === courseState.updatedStudents;
    }
    isOmmited(){
         return this.currentState === courseState.graduated;
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
        return State.deserializeClass(data, Course);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createCourse(AdminId, courseId, name, crs) {
        return new Student({ AdminId, courseId, name, crs, [], [] });
    }
    //order (AdminId, courseId, name, crs, registeredStudents, professors)

    static getClass() {
        return 'org.papernet.commercialpaper';
    }
}

module.exports = Course;