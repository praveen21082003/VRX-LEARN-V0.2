export const roleNavigation = {
        TRAINEE: [
            {
                name: "Dashboard",
                icon: "material-symbols:dashboard-rounded",
                path: "/dashboard",
            },
            {
                name: "My Learning",
                icon: "mdi:compass",
                path: "/learning",
            },
        ],

        TRAINER: [
            {
                name: "Dashboard",
                icon: "material-symbols:dashboard-rounded",
                path: "/dashboard",
            },
            {
                name: "Courses",
                icon: "streamline-plump:graduation-cap-solid",
                path: "/courses",
            },
        ],

        ADMIN: [
            {
                name: "Dashboard",
                icon: "tabler:layout-dashboard-filled",
                path: "/dashboard",
            },
            {
                name: "Users",
                icon: "mdi:users",
                path: "/users",
            },
            {
                name:"Enrollments",
                icon:"mdi:book-account",
                path:"/enrollments",
            },
            {
                name:"Manage Course",
                icon:"si:book-fill",
                path:"/courses"
            }
        ]
    };