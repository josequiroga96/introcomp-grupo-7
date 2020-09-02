
let accX = []
let accY = []
let accZ = []

let accWGX = []
let accWGY = []
let accWGZ = []

let rotAlpha = []
let rotBeta = []
let rotGamma = []

setInterval(async () => {
    const response = await fetch('/api/info')
    const json = await response.json()

    accX.push(
        {
            y: json.acceleration.x
        }

    )

    acc.y.push(
        {
            y: json.acceleration.y
        }
    )

    acc.z.push(
        {
            y: json.acceleration.z
        }
    )

    accWGX.push({ y: json.accelerationWithGravity.x })
    accWGY.push({ y: json.accelerationWithGravity.y })
    accWGZ.push({ y: json.accelerationWithGravity.z })

    rotAlpha.push({ y: json.rotationRate.alpha })
    rotBeta.push({ y: json.rotationRate.beta })
    rotGamma.push({ y: json.rotationRate.gamma })


}, 3001)


window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Simple Line Chart"
        },
        data: [
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: accX
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: accY
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: accZ
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: accWGX
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: accWGY
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: accWGZ
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: rotAlpha
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: rotBeta
            },
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: rotGamma
            },
        ]
    });
    chart.render();

}