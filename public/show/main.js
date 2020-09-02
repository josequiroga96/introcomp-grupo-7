
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
    console.log(json)

    accX.push(
        {
            y: json.acceleration.x
        }

    )

    accY.push(
        {
            y: json.acceleration.y
        }
    )

    accZ.push(
        {
            y: json.acceleration.z
        }
    )

    accWGX.push({ y: json.accelerationIncludingGravity?.x })
    accWGY.push({ y: json.accelerationIncludingGravity?.y })
    accWGZ.push({ y: json.accelerationIncludingGravity?.z })

    rotAlpha.push({ y: json.rotationRate.alpha })
    rotBeta.push({ y: json.rotationRate.beta })
    rotGamma.push({ y: json.rotationRate.gamma })


}, 3001)

window.onload = () => {
    setInterval(() => {
        draw()
    }, 3002)
}

function draw() {


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