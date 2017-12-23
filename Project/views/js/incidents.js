const IncidentTemplate = `
    <h4>Selected Student:</h4>
    <table class="table table-striped">
        <tbody>
        <tr>
            <td>Student ID</td>
            <td>First Name</td>
            <td>Last Name</td>
        </tr>
         
           {{#each .}}
        <tr>
            <td>{{studentId}}</td>
            <td>{{firstName}}</td>
            <td>{{lastName}}</td>
        </tr>
         {{/each}}
        </tbody>
    </table>
`
document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#studentsList').addEventListener("change", onChange)
})
async function getIncidents(countryCode) {
    const url = `/api/countries/${countryCode}`
    const response = await fetch(url)
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
        const htmlTemplate = Handlebars.compile(studentTemplate)
        const htmlContent = htmlTemplate(student)

        document.querySelector('#incidentsDetails').innerHTML = htmlContent
    }
    catch (err) {
        console.log(err)
    }
}
