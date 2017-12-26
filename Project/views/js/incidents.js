const IncidentsTemplate = `
    <h4>Selected Student:</h4>
    <table class="table table-striped">
        <tbody>
       {{#each incident}}
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
      {{/each}}
            
        </tbody>
    </table>
`;
document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#studentsList').addEventListener("change", onChange)
});

async function getStudentIncidents(studentID) {
    const url = `/api/incidents/${studentID}`
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

    try {
        const incidents = await getStudentIncidents(selectedStudentId)
        const htmlTemplate = Handlebars.compile(IncidentsTemplate)
        const htmlContent = htmlTemplate(incidents)

        document.querySelector('#incidentsDetails').innerHTML = htmlContent
    }
    catch (err) {
        console.log(err)
    }
}


