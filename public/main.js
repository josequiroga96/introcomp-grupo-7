// http://192.168.200.39:8080/api/info

const url = "http://192.168.1.100:8080/api/info"

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

const output = document.getElementById("motion-output")

const deviceMotionFun = (event) => {

  const { acceleration, accelerationIncludingGravity, rotationRate } = event
  const data = { acceleration, accelerationIncludingGravity, rotationRate }

  output.innerHTML = JSON.stringify(data)

  postData(url, data)
}

window.ondevicemotion = deviceMotionFun


// document.getElementById('allow-sensors').onclick = () => {
//   // feature detect
//   // if (typeof DeviceMotionEvent.requestPermission === 'function') {
//   DeviceMotionEvent.requestPermission()
//     .then(permissionState => {
//       if (permissionState === 'granted') {
//         window.addEventListener('devicemotion', deviceMotionFun);
//       }
//     })
//     .catch(console.error);
//   // } else {
//   //   // handle regular non iOS 13+ devices
//   //   window.addEventListener('devicemotion', deviceMotionFun);
//   // }
// }

