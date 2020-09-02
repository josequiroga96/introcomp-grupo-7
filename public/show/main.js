let acc = {
    x: [],
    y: [],
    z: []
}
let accX = [
    {
        y: jsndj
    }
]
let accWG = {
    x: [],
    y: [],
    z: []
}
let rot = {
    alpha: [],
    betta: [],
    gamma: []
}


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

    accWG.x.push(json.accelerationWithGravity.x)
    accWG.y.push(json.accelerationWithGravity.y)
    accWG.z.push(json.accelerationWithGravity.z)

    rot.alpha.push(
        {
            y:json.rotationRate.alpha
    }
    )

    rot.beta.push({
            y:json.rotationRate.beta
    }
    )
    rot.gamma.push(
        {
           y: json.rotationRate.gamma
        }

    )


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