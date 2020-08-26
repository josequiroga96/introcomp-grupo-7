// http://192.168.200.39:8080/api/info
async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => console.log("Send Data"));
    return response.json();
}

window.addEventListener("devicemotion", handleMotion)
postData("http://192.168.200.39:8080/api/info", {message: "init"})
function handleMotion(event) {
  const output = document.getElementById("motion-output")
  // console.log(event)

  let properties = ""
  for (let prop in event) {
    if (prop === "acceleration") {
      properties += prop + " x: " + event.acceleration.x + "<br>"
      properties += prop + " y: " + event.acceleration.y + "<br>"
      properties += prop + " z: " + event.acceleration.z + "<br>"
    } else if (prop === "accelerationIncludingGravity") {
      properties +=
        prop + " x: " + event.accelerationIncludingGravity.x + "<br>"
      properties +=
        prop + " y: " + event.accelerationIncludingGravity.y + "<br>"
      properties +=
        prop + " z: " + event.accelerationIncludingGravity.z + "<br>"
    } else if (prop === "rotationRate") {
      properties += prop + " alpha: " + event.rotationRate.alpha + "<br>"
      properties += prop + " beta: " + event.rotationRate.beta + "<br>"
      properties += prop + " gamma: " + event.rotationRate.gamma + "<br>"
    } else {
      properties += prop + ": " + event[prop] + "<br>"
    }
  }
  postData("http://192.168.200.39:8080/api/info", {data: properties})
  output.innerHTML = properties
}

window.addEventListener("deviceorientation", handleOrientation)
function handleOrientation(event) {
  const output = document.getElementById("orientation-output")
  //   console.log(event)
  let properties = ""
  for (let prop in event) {
    properties += prop + ": " + event[prop] + "<br>"
  }
  output.innerHTML = properties
}
