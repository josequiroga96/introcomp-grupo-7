
let accX = []
let accY = []
let accZ = []

let accWGX = []
let accWGY = []
let accWGZ = []

let rotAlpha = []
let rotBeta = []
let rotGama = []

setInterval(async () => {
    const response = await fetch('/api/info')
    const json = await response.json()

    accX.push(
        {
            y: json.acceleration.x
        }

    )
    acc.y.push(json.acceleration.y)
    acc.z.push(json.acceleration.z)

    accWGX.push({ y: json.accelerationWithGravity.x })
    accWGY.push({ y: json.accelerationWithGravity.y })
    accWGZ.push({ y: json.accelerationWithGravity.z })

    rotAlpha.push(json.rotationRate.alpha)
    rotBeta.push(json.rotationRate.beta)
    rotGamma.push(json.rotationRate.gamma)


}, 3001)


window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Simple Line Chart"
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: [
                { y: 450 },
                { y: 414 },
                { y: 520, indexLabel: "\u2191 highest", markerColor: "red", markerType: "triangle" },
                { y: 460 },
                { y: 450 },
                { y: 500 },
                { y: 480 },
                { y: 480 },
                { y: 410, indexLabel: "\u2193 lowest", markerColor: "DarkSlateGrey", markerType: "cross" },
                { y: 500 },
                { y: 480 },
                { y: 510 }
            ]
        }]
    });
    chart.render();

}