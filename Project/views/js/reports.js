function refineDate(){
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;

    fillGradeLevel(from,to);
}

function fillGradeLevel(from,to) {
    let table = "<tr><th></th>";
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
