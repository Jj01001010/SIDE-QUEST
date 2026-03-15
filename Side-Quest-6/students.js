const students = [
    { student_id: 1, name: "Jericho", course: "BSIT" },
    { student_id: 2, name: "JJ", course: "BSCS" },
    { student_id: 3, name: "Merry", course: "BSBA" },
    { student_id: 4, name: "Anna", course: "BSIT" },
    { student_id: 5, name: "Mark", course: "BSCS" }
];

const parentList = document.querySelector(".datas")

while (true) {

    console.log("\nWelcome to mini student Portal")
    console.log("1 - Show all students")
    console.log("2 - Search By ID")
    console.log("3 - Course Statistics")
    console.log("4 - Exit")

    const choice = Number(prompt("Enter Your Choice: "))
    const coursesCount = {}

    if (choice === Number(null)) {
        console.log("Program canceled...")
        break;
    }

    if (isNaN(choice)) {
        console.log("Invalid choice try again")
        break;
    }

    if (choice === 1) {
        for (let student of students) {
            const newList = document.createElement("li")
            newList.textContent = `${student.student_id} ${student.name} - ${student.course}`
            parentList.appendChild(newList)
        }

    } else if (choice === 2) {
        const searchID = Number(prompt("Search ID: "))
        let found = false

        for (let student of students) {
            if (searchID === student.student_id) {

                const newList = document.createElement("li")
                newList.textContent = `${student.student_id} - ${student.name} : ${student.course}`
                parentList.appendChild(newList)

                found = true
            }
        }

        if (!found) {
            const newList = document.createElement("li")
            newList.textContent = "Student ID not found."
            parentList.appendChild(newList)
        }

    } else if (choice === 3) {

        for (let student of students) {
            if (coursesCount[student.course]) {
                coursesCount[student.course] += 1
            } else {
                coursesCount[student.course] = 1
            }
        }

        for (let course in coursesCount) {
            const newList = document.createElement("li")
            newList.textContent = `${course}: ${coursesCount[course]}`
            parentList.appendChild(newList)
        }
        continue;
    } else if (choice === 4) {
        console.log("Program ended.")
        break;
    }

}






















