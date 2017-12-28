
document.addEventListener("DOMContentLoaded", function () {
    console.log("js-DOM fully loaded and parsed for click");
    // document.querySelector('editIncident').addEventListener("click",goToIncidentEditor)
    goToIncidentEditor()
})

function goToIncidentEditor() {
    // let incidentID = document.getElementById("incident").value;
    const selectedIncidentID = this.value;
    console.log("selectedIncidentID",selectedIncidentID)
    const url = `/incidentEditor`
    window.location.replace(url);
}
