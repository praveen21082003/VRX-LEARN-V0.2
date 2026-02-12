import { Children } from "react";

export const COURSE_EDIT_SECTIONS = [
    {
        key: "info",
        label: "CourseInformation",
        path: "info",
        childrens: false
    },
    {
        key: "modules",
        label: "Modules",
        path: "modules",
        childrens: true
    },
    {
        key: "quiz",
        label: "Quiz",
        path: "quiz",
        childrens: true
    },
    {
        key: "assignment",
        label: "Assignment",
        path: "assignment",
        childrens: true
    },
    {
        key: "lab",
        label: "Lab Credentials",
        path: "lab",
        childrens: true
    },
    {
        key: "feedback",
        label: "Feedback",
        path: "feedback",
        childrens: true
    }
]