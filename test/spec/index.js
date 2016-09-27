"use strict";

const tap = require("tap");
const fs = require("fs");
const path = require("path");
const converter = require("../../index");

function compare (result, output) {
    return result.replace(/\s+/g, "") === output.replace(/\s+/g, "");
}

function test (dir) {
    const file1 = path.join(__dirname, "../fixture/", dir, "/input.js");
    const file2 = path.join(__dirname, "../fixture/", dir, "/output.js");
    const input = fs.readFileSync(file1, "utf8");
    const output = fs.readFileSync(file2, "utf8");
    const result = converter(input);
    if (dir === "app/behavior_1") {
        console.log(output);
        console.log(result);
    }
    return compare(result, output);
}

tap.test("the converter should be available", function (t) {
    t.assert(typeof converter === "function");
    t.end();
});

tap.test("it should convert empty array in define correctly", function (t) {
    t.assert(test("define-callback-empty-array"));
    t.end();
});

tap.test("it should convert empty array in define with array function correctly", function (t) {
    t.assert(test("define-arrow-function-callback-empty-array"));
    t.end();
});

tap.test("it should convert define with callback only correctly using the built in parser", function (t) {
    t.assert(test("define-callback-only"));
    t.end();
});

tap.test("it should convert empty define with arrow function correctly", function (t) {
    t.assert(test("define-arrow-function-callback-only"));
    t.end();
});

tap.test("it should convert define with deps correctly", function (t) {
    t.assert(test("define-arrow-function-callback-with-deps"));
    t.end();
});

tap.test("it should convert define with deps with arrow function correctly", function (t) {
    t.assert(test("define-callback-with-deps"));
    t.end();
});

tap.test("it should convert define with an object in callback only correctly", function (t) {
    t.assert(test("define-object-only"));
    t.end();
});

tap.test("it should keep dependencies with side effects", { todo: true }, function (t) {
    t.assert(test("app/behavior_1"));
    t.end();
});

tap.test("it should convert controllers correctly", function (t) {
    t.assert(test("app/controller_1"));
    t.end();
});

tap.test("it should leave empty var statements", function (t) {
    t.assert(test("app/helper_1"));
    t.end();
});

tap.test("it should leave empty var statements", function (t) {
    t.assert(test("app/helper_2"));
    t.end();
});

tap.test("it should leave empty var statements", function (t) {
    t.assert(test("app/model_1"));
    t.end();
});

tap.test("it should convert views correctly", function (t) {
    t.assert(test("app/view_1"));
    t.end();
});

tap.test("it should convert modules with functions after the return correctly", function (t) {
    t.assert(test("app/view_2"));
    t.end();
});

tap.test("it should convert modules with constructors assigned to variables correctly", function (t) {
    t.assert(test("app/view_3"));
    t.end();
});

tap.test("it should convert subapps correctly", function (t) {
    t.assert(test("app/subapp_1"));
    t.end();
});

tap.test("it should convert modules with one require sugar call expression correctly", function (t) {
    t.assert(test("app/module_1"));
    t.end();
});

tap.test("it should convert modules with multiple require sugar call expressions correctly", function (t) {
    t.assert(test("app/module_2"));
    t.end();
});
