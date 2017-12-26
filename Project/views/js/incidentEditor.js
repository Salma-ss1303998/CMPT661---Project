const studentReporterTemplate =`
      <label> Reporter Name: </label>
      <select name="studentReporter" class="col-sm-10" class="form-control">
          {{#studentsReporter}}
              <option value="{{_id}}">{{studentId}} {{firstName}} {{lastName}}</option>
          {{/studentsReporter}}
      </select>


`;
const staffReporterTemplate =`
      <label> Reporter Name: </label>
      <select name="staffReporter">
          {{#staffs}}
              <option value="{{_id}}"> {{firstName}} {{lastName}}: {{occupation}}</option>
          {{/staffs}}
      </select>
`;


document.addEventListener("DOMContentLoaded", function () {
    lookup();
})


function addAttachment(){

}

function addPenalty(){


}

function addNote(){


}

function addStudent(){

}

function lookup() {

    if (document.getElementById('studentChecked').checked) {
        const htmlTemplate = Handlebars.compile(studentReporterTemplate)
        const htmlContent = htmlTemplate(studentsReporter)
        document.querySelector('#reporterDetails').innerHTML = htmlContent
    }
    if (document.getElementById('staffChecked').checked) {
        const htmlTemplate = Handlebars.compile(staffReporterTemplate )
        const htmlContent = htmlTemplate(staffs)
        document.querySelector('#reporterDetails').innerHTML = htmlContent
    }

}

