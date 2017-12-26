
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
        document.getElementById('studentLookup').style.visibility = 'visible';
    }
    else document.getElementById('studentLookup').style.visibility = 'hidden';

    if (document.getElementById('staffChecked').checked) {
        document.getElementById('staffLookup').style.visibility = 'visible';
    }
    else document.getElementById('staffLookup').style.visibility = 'hidden';

}

