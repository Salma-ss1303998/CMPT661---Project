const IncidentsTemplate = `
    <h4>Selected Student:</h4>
    <table class="table table-striped">
        <tbody>
        <tr>
            <td>Description</td>
            <td>Type</td>
            <td>Date</td>
            <td>Location</td>
        </tr>
         
        <tr>
            <td>{{description}</td>
            <td>{{type}}</td>
            <td>{{date}}</td>
            <td>{{location}}</td>
        </tr>
        </tbody>
    </table>
`;
document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#studentsList').addEventListener("change", onChange)
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#').addEventListener("click",onClick)
});
async function getIncidents(studentID) {
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
        const student = await getIncidents(selectedStudentId)
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

}

