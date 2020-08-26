let motionProps, orientationProps

window.addEventListener("devicemotion", handleMotion)
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
  output.innerHTML = properties

  motionProps = event
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

  orientationProps = event
}

setInterval(() => {
  fetch("api/info", {
    method: "post",
    body: JSON.stringify({ orientationProps, motionProps }),
  })
}, 30000)
