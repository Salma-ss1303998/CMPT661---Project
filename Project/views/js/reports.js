function refineDate(){
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;

    fillGradeLevel(from,to);
    fillLocation(from,to);
    fillType(from,to);
}

function fillGradeLevel(from,to) {
    let table = "<tr><th>Academic Year</th><th>Count</th></tr>\n"
    //getCountByDate(from,to);  returns
    // list
    for (let i=0; i<= 3; i++){
        table += `<tr><td>${i}</td><td>${i*2}</td></tr>`
    }

    document.getElementById('gradeLevelList').innerHTML = table
}

function fillLocation(from,to) {
    let table = "<tr><th>Location</th><th>Count</th></tr>\n"

    for (let i=0; i<= 3; i++){
        table += `<tr><td>${i}</td><td>${i*2}</td></tr>`
    }

    document.getElementById('locationList').innerHTML = table
}

function fillType(from,to) {
    let table = "<tr><th>Incident Type</th><th>Count</th></tr>\n"

    for (let i=0; i<= 3; i++){
        table += `<tr><td>${i}</td><td>${i*2}</td></tr>`
    }

    document.getElementById('typeList').innerHTML = table
}


//     const GradeTemplate = `
//     <h4>Incident summary based on  Academic Level:</h4>
//     <table class="table table-striped">
//         <tbody>
//         <tr>
//             <td>Academic Level</td>
//             <td>Number of Incidents</td>
//
//         </tr>
//
//         <tr>
//             <td><a href="">{{grade}}</a></td>
//             <td>{{grade.count}}</td>
//
//         </tr>
//         </tbody>
//     </table>
//
// `
//     const LocationTemplate = `
//
//     <h4>Incident summary based on the Location</h4>
//     <table class="table table-striped">
//         <tbody>
//         <tr>
//             <td>Location</td>
//             <td>Number of Incidents</td>
//
//         </tr>
//
//         <tr>
//             <td><a href="">{{location}}</a></td>
//             <td>{{location.count}}</td>
//
//         </tr>
//         </tbody>
//     </table>
//
//    `
//     const TypesTemplate = `
//
//     <h4>Incident summary based on the Types</h4>
//     <table class="table table-striped">
//         <tbody>
//         <tr>
//             <td>Type</td>
//             <td>Number of Incidents</td>
//
//         </tr>
//
//         <tr>
//             <td><a href="">{{Type}}</a></td>
//             <td>{{type.count}}</td>
//
//         </tr>
//         </tbody>
//     </table>
// `
//
