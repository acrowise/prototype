



class StudentCourse {

    constructor(courseId, name, grade, crs, professors) {
    	this.courseId = courseId; this.name = name;
    	this.grade = grade; this.crs = crs;
    	this.professors = professors;
    } // order (courseId, name, grade, crs, professors)

    getGrade() {
        return this.grade;
    }

    setGrade(grade) {
        this.grade = grade;
    }
    getCrs() {
        return this.crs;
    }

}