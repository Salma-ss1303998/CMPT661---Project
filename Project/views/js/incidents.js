const IncidentsTemplate = `

    <table class="table table-striped">
        <tbody>
         <tr>
            <td>Type</td>
            <td>Date</td>
            <td>Location</td>
        </tr>
        
       {{#each .}}
        <tr>
<<<<<<< HEAD
          <td><a href="/api/incident/{{_id}}">{{type}}</a></td>
          <td><a href="/api/incident/{{_id}}">{{date}}</a></td>
          <td><a href="/api/incident/{{_id}}">{{location}} </a></td> 
=======
          <td>{{type}}</td>
          <td>{{date}}</td>
          <td>{{location}}</td> 
          <td><a href="">Press here</a></td>
          
>>>>>>> 9250e294df0215a781c994908a08b9f3d6936363
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
    console.log("selcted student ID", selectedStudentId)

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
