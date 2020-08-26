// http://192.168.200.39:8080/api/info

const url = "http://localhost:8080/api/info"

async function postData(url = "", data = {}) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  // .then(() => console.log("Send Data"))
  // return response.json()
}

postData(url, { message: "init" })

window.addEventListener("devicemotion", (event) => {
  const output = document.getElementById("motion-output")

  let properties = ""
  let data = {}
  for (let prop in event) {
    if (prop === "acceleration") {
        data[prop] = {
            x: event[prop].x,
            y: event[prop].y,
            z: event[prop].z
        }
        properties += prop + " x: " + event.acceleration.x + "<br>"
        properties += prop + " y: " + event.acceleration.y + "<br>"
        properties += prop + " z: " + event.acceleration.z + "<br>"
    } else if (prop === "accelerationIncludingGravity") {
        data[prop] = {
            x: event[prop].x,
            y: event[prop].y,
            z: event[prop].z
        }
        properties += prop + " x: " + event.accelerationIncludingGravity.x + "<br>"
        properties += prop + " y: " + event.accelerationIncludingGravity.y + "<br>"
        properties += prop + " z: " + event.accelerationIncludingGravity.z + "<br>"
    } else if (prop === "rotationRate") {
        data[prop] = {
            alpha: event[prop].alpha,
            beta: event[prop].beta,
            gamma: event[prop].gamma
        }
        properties += prop + " alpha: " + event.rotationRate.alpha + "<br>"
        properties += prop + " beta: " + event.rotationRate.beta + "<br>"
        properties += prop + " gamma: " + event.rotationRate.gamma + "<br>"
    } else {
        // data[prop] = event[prop]
        properties += prop + ": " + event[prop] + "<br>"
    }
  }
  output.innerHTML = properties

  postData(url, { data: data })
})

window.addEventListener("deviceorientation", handleOrientation)
function handleOrientation(event) {
  const output = document.getElementById("orientation-output")
  let properties = ""
  for (let prop in event) {
    properties += prop + ": " + event[prop] + "<br>"
  }
  output.innerHTML = properties
}
