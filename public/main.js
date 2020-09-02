// http://192.168.200.39:8080/api/info


async function postData(data = {}) {
  const url = "http://192.168.1.100:8080/api/info"
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}


postData({ message: "init" })


const output = document.getElementById("motion-output")

let data = { message: 'empty' };

window.addEventListener('devicemotion', onDeviceMotion)

function onDeviceMotion(event) {

  const {
    acceleration: {
      x: accX,
      y: accY,
      z: accz
    },
    accelerationIncludingGravity: {
      x: accGrX,
      y: accGrY,
      z: accGrZ
    },
    rotationRate: {
      alpha,
      beta,
      gamma
    }
  } = event

  data = {
    acceleration: {
      x: accX,
      y: accY,
      z: accz
    },
    accelerationIncludingGravity: {
      x: accGrX,
      y: accGrY,
      z: accGrZ
    },
    rotationRate: {
      alpha,
      beta,
      gamma
    }
  }

  console.log(data)

  output.innerHTML = JSON.stringify(data)

}

setInterval(() => {
  postData(data)
}, 3000)


