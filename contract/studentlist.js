/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const Student = require('./student.js');

class StudentList extends StateList {

    constructor(ctx) {
        super(ctx, 'AAST');
        this.use(Student);
    }

    async addStudent(studentId) {
        return this.addState(student);
    }

    async getStudent(studentId) {
        return this.getState(student);
    }

    async updateStudent(studentId) {
        return this.updateState(student);
    }
}


module.exports = StudentList;