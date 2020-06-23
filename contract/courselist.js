/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const Course = require('./course.js');

class PaperList extends StateList {

    constructor(ctx) {
        super(ctx, 'AAST');
        this.use(Student);
    }

    async addCourse(courseId) {
        return this.addState(course);
    }

    async getCourse(courseId) {
        return this.getState(course);
    }

    async updateCourse(courseId) {
        return this.updateState(course);
    }
}


module.exports = CourseList;