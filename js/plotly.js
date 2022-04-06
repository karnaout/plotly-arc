// var trace1 = {
//     x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 
//     y: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
//     fill: "tozerox", 
//     fillcolor: "rgba(0,100,80,0.2)", 
//     line: {color: "transparent"}, 
//     name: "Main Arc", 
//     mode: 'markers',
//     type: "scatter"
// };

// var trace2 = {
// x: [2, 3, 4, 5],
// y: [16, 5, 11, 9],
// mode: 'lines',
// type: 'scatter'
// };

// var trace3 = {
// x: [1, 2, 3, 4],
// y: [12, 9, 15, 12],
// mode: 'lines+markers',
// type: 'scatter'
// };

// var data = [trace1, trace2, trace3];

// Plotly.newPlot('myTimeline', data);

const CSV = "https://raw.githubusercontent.com/karnaout/plotly-arc/main/assets/csvs/arc.csv";

function plotFromCSV() {
    Plotly.d3.csv(CSV, function(err, rows) {
        console.log(rows);
        processData(rows);
    });
}   

function processData(allRows) {
    let x = [];
    let y1 = [];
    let y2 = [];
    let row;

    let i = 0;
    while (i < allRows.length) {
        row = allRows[i];
        x.push(row["Date"]);
        y1.push(row["A"]);
        y2.push(row["B"]);
        i += 1;
    }
    
    console.log("X", x);
    console.log("Y1", y1);

    makePlotly(x, y1, y2);
}

function makePlotly(x, y1, y2) {
    let traces = [
        {
            x: x,
            y: y1,
            name: "A",
            line: {
                color: "#387fba",
                width: 3
            }
        },
        {
            x: x,
            y: y2,
            name: "Main",
            line: {
                color: "#54ba38",
                width: 3,
                // dash: "dash"
            }
        }
    ];

    let layout = {
        title: "Basic Line Chart",
        yaxis: {
            range: [0, 100]
        },
        xaxis: {
            // tickformat: "%d/%m/%y"
        },
    };

    //https://plot.ly/javascript/configuration-options/
    let config = { 
        responsive: true,
    };

    Plotly.newPlot("myTimeline", traces, layout, config);
}

plotFromCSV();