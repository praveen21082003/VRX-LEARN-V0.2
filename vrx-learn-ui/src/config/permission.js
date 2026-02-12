export const ROLE_PERMISSION = {
    ADMIN: [
        "CREATE_USER",
        "CREATE_COURSE",
        "CREATE_MODULES",
        "CREATE_ASSIGNMENTS",
        "CREATE_QUIZ",
        "CREATE_LABS",
        "DELETE_USER",
        "DELETE_COURSE",
        "DELETE_MODULES",
        "DELETE_ASSIGNMENTS",
        "DELETE_QUIZ",
        "DELETE_LABS",
        "UPDATE_USER",
        "UPDATE_COURSE",
        "UPDATE_MODULES",
        "UPDATE_ASSIGNMENTS",
        "UPDATE_QUIZ",
        "UPDATE_LABS",
    ],

    SUBADMIN: [
        "UPDATE_COURSE",
        "ASSIGN_TRAINER",
    ],

    TRAINER: [
        "CREATE_MODULES",
        "UPDATE_MODULES",
        "DELETE_MODULES",
        "GRADE_ASSIGNMENT"
    ],

    TRAINEE: [
        "VIEW_COURSE",
        "SUBMIT_ASSIGNMENT"
    ]
}


// console.log(Object.keys(ROLE_PERMISSION).includes("ADMIN"));