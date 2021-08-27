//declarations
const url = window.location.href

//function
function callApi(){
    const idIndex = url.search("id=")
    let toReturn = ''
    for(let i = idIndex; i < url.length; i++){
        toReturn += url.charAt(i)
    }

    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/deleteAppointment?" + toReturn)
    request.send()
    request.onload = () => {
        console.log(request)
        if(request.status == 200){
            const hideMe = document.getElementById('shown')
            const showMe = document.getElementById('hidden')
            if(hideMe != null){
                hideMe.style.visibility = "hidden"
            }
            if(showMe != null){
                showMe.style.visibility = "visible"
            }

        } else {
            const hideMe = document.getElementById('shown')
            if(hideMe != null){
                hideMe.style.visibility = "hidden"
            }

            const error = document.getElementById('error')
            if(error != null){
                error.style.visibility = "visible"
            }
        }
    }


}