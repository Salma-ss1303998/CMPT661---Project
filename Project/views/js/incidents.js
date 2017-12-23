
const behvaiorController = require('..../controllers/behaviorController');
document.addEventListener("DOMContentLoaded", () => {
    getData();
})

async function getData() {
    let x =document.getElementById("studentsDD");
    let option = document.createElement("option");
    let students =await this.behvaiorController.getStudents();
    for (const s of students) {
        option.text =s  ;
        x.add(option);
    }

}
