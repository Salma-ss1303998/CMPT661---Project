const IncidentsTemplate = `
    <h4>Selected Student:</h4>
    <table class="table table-striped">
        <tbody>
        <tr>
            <td>Student ID</td>
            <td>First Name</td>
            <td>Last Name</td>
        </tr>
         
        <tr>
            <td><a href="">{{studentId}}</a></td>
            <td>{{firstName}}</td>
            <td>{{lastName}}</td>
        </tr>
        </tbody>
    </table>
`

const IncidentTemplate = `
    <h4>Selected Student:</h4>
    <table class="table table-striped">
   <tbody>
        <tr>
            <td>Student ID</td>
            <td>{{studentId}}</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>DateOfBirth</td>
            <td>Gender</td>
            <td>Email</td>
            <td>Grade</td>
        </tr>
         
=======
        <tr>
            <td>First Name</td>
            <td>{{firstName}}</td>
        </tr>
        <tr>
            <td>Last Name</td>
            <td>{{lastName}}</td>
            <td>{{dateOfBirth}}</td>
            <td>{{gender}}</td>
            <td>{{email}}</td>
            <td>{{grade}}</td> 
        </tr>
        </tbody>

    </table>
`
document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#studentsList').addEventListener("change", onChange)
})

document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#').addEventListener("click",onClick)
})
async function getStudent(studentID) {
    const url = `/api/students/${studentID}`
    const response = await fetch(url)
    console.log("response " + response)
    return await response.json()
}

async function onChange(e) {
    const selectedStudentId = this.value;

    if (selectedStudentId == "") {
        document.querySelector('#incidentsDetails').innerHTML = '';
        return
    }
    console.log("onStudentChange.selectedStudentId:", selectedStudentId)

    try {
        const student = await getStudent(selectedStudentId)
        console.log(student);
        const htmlTemplate = Handlebars.compile(IncidentsTemplate)
        const htmlContent = htmlTemplate(student)

        document.querySelector('#incidentsDetails').innerHTML = htmlContent
    }
    catch (err) {
        console.log(err)
    }
}
async function onClick(e) {
    const selectedStudentId = this.value;

    if (selectedStudentId == "") {
        document.querySelector('#incidentsDetails').innerHTML = '';
        return
    }
    console.log("onStudentChange.selectedStudentId:", selectedStudentId)

    try {
        const student = await getStudent(selectedStudentId)
        console.log(student);
        const htmlTemplate = Handlebars.compile(IncidentsTemplate)
        const htmlContent = htmlTemplate(student)

        document.querySelector('#incidentsDetails').innerHTML = htmlContent
    }
    catch (err) {
        console.log(err)
    }
}

