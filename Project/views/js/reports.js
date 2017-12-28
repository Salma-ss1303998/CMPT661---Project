function refineDate() {
    console.log("refining search...")
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;

    console.log(from + " + " + to)
    fillGradeLevel(from, to).then(c => console.log(c)).catch(err => console.log(err));
    fillLocation(from, to).then(c => console.log(c)).catch(err => console.log(err));
    fillType(from, to).then(c => console.log(c)).catch(err => console.log(err));
}

//
async function fillGradeLevel(from, to) {
    let table = "<tr><th>Grade</th><th>Count</th></tr>\n"

    const url = `/api/countByGrade/${from}/${to}`
    const response = await fetch(url)
    let list = await response.json()

    // console.log("json is : " + list.length)

    list.forEach(item => {
        console.log(item.grade + " : " + item.count)
        table += `<tr><td><a href="/incidents"> ${item.grade}</a></td><td><a href="/incidents"> ${item.count}</a></td></tr>`

    })

    document.getElementById('gradeLevelList').innerHTML = table
}

async function fillLocation(from, to) {
    let table = "<tr><th>Location</th><th>Count</th></tr>\n"

    const url = `/api/countByLocation/${from}/${to}`
    const response = await fetch(url)
    let list = await response.json()


    list.forEach(item => {
        console.log(item.location + " : " + item.count)
        table += `<tr><td>${item.location}</td><td>${item.count}</td></tr>`

    })
    document.getElementById('locationList').innerHTML = table
}

async function fillType(from, to) {
    let table = "<tr><th>Location</th><th>Count</th></tr>\n"

    const url = `/api/countByType/${from}/${to}`
    const response = await fetch(url)
    let list = await response.json()

    list.forEach(item => {
        console.log(item.type + " : " + item.count)
        table += `<tr><td>${item.type}</td><td>${item.count}</td></tr>`

    })
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
