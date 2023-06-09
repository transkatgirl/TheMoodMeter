// yes i'm aware the code is a mess, i'll clean it up soon

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.templateCanvas = document.createElement("canvas");
canvas.templateCanvas.width = canvas.width;
canvas.templateCanvas.height = canvas.height;

const offscreen_ctx = canvas.templateCanvas.getContext("2d");

const table = document.getElementById("table");

var mood_data = [];
var config = { moods_open: true, settings_open: false, theme: "1", maximum_data_points: 1200, maximum_graphed_points: 15, minimum_minutes: 5, data_hide_time: 2.5 };

var default_config = config;

const download_link = document.getElementById("download");

const mood_menu = document.getElementById("moods");
const settings_menu = document.getElementById("settings");
const theme_input = document.getElementById("theme");
const data_limit_input = document.getElementById("maxData");
const data_graph_limit_input = document.getElementById("maxGraphData");
const data_combine_input = document.getElementById("minTime");
const data_hide_input = document.getElementById("hideTime");

function renderTemplate0(ctx) {
	ctx.fillStyle = "firebrick";
	ctx.fillRect(0, 0, canvas.width * 0.5, canvas.height * 0.5);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.5);
	ctx.fillStyle = "darkseagreen";
	ctx.fillRect(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.5);
	ctx.fillStyle = "darkolivegreen";
	ctx.fillRect(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height * 0.5);

	ctx.lineWidth = Math.min(canvas.width, canvas.height) * 0.005;
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(canvas.width * 0.5, 0);
	ctx.lineTo(canvas.width * 0.5, canvas.height);
	ctx.moveTo(0, canvas.height * 0.5);
	ctx.lineTo(canvas.width, canvas.height * 0.5);
	ctx.stroke();
}

function renderTemplate1(ctx) {
	ctx.fillStyle = "firebrick";
	ctx.fillRect(0, 0, canvas.width * 0.5, canvas.height * 0.5);
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.5);
	ctx.fillStyle = "darkseagreen";
	ctx.fillRect(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5, canvas.height * 0.5);
	ctx.fillStyle = "darkolivegreen";
	ctx.fillRect(canvas.width * 0.5, 0, canvas.width * 0.5, canvas.height * 0.5);

	ctx.fillStyle = "orange";
	ctx.fillRect(0, canvas.height * (0.5 - (0.17 - 0.02)), canvas.width * (0.17 + (0.5 - 0.02)), canvas.height * 0.17);
	ctx.fillRect(canvas.width * (0.5 - 0.02), canvas.height * 0.5, canvas.width * 0.17, canvas.height * 0.5);

	ctx.fillStyle = "cornflowerblue";
	ctx.fillRect(0, canvas.height * 0.85, canvas.width * 0.15, canvas.height * 0.15);
	ctx.fillStyle = "khaki";
	ctx.fillRect(canvas.width * 0.85, 0, canvas.width * 0.15, canvas.height * 0.15);

	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	let textSize = Math.min(canvas.width, canvas.height) * 0.02;
	ctx.font = textSize + "px sans-serif";

	ctx.fillText("Mom would", canvas.width * 0.075, (canvas.height * 0.925) - (textSize / 2));
	ctx.fillText("be sad", canvas.width * 0.075, (canvas.height * 0.925) + (textSize / 2));
	ctx.fillText("LETS FUCKING", canvas.width * 0.925, (canvas.height * 0.075) - (textSize / 2));
	ctx.fillText("GOOOOOOOO", canvas.width * 0.925, (canvas.height * 0.075) + (textSize / 2));

	textSize = Math.min(canvas.width, canvas.height) * 0.09;
	ctx.font = textSize + "px sans-serif";

	ctx.fillText("It's so", canvas.width * 0.24, (canvas.height * 0.685) - (textSize / 2));
	ctx.fillText("over", canvas.width * 0.24, (canvas.height * 0.685) + (textSize / 2));
	ctx.fillText("We", canvas.width * 0.825, (canvas.height * 0.75) - (textSize / 2));
	ctx.fillText("vibing", canvas.width * 0.825, (canvas.height * 0.75) + (textSize / 2));
	ctx.fillText("Fuck it", canvas.width * 0.25, (canvas.height * 0.175) - (textSize / 2));
	ctx.fillText("we ball", canvas.width * 0.25, (canvas.height * 0.175) + (textSize / 2));

	ctx.fillText("It is", canvas.width * 0.36, canvas.height * 0.435);

	ctx.save();
	ctx.translate(canvas.width * (0.565 - 0.02125), canvas.height * (0.435 + 0.02125));
	ctx.rotate(Math.PI / 4);
	ctx.fillText("what", 0, 0);
	ctx.restore();
	ctx.save();
	ctx.translate(canvas.width * 0.565, canvas.height * 0.64);
	ctx.rotate(Math.PI / 2);
	ctx.fillText("it is", 0, 0);
	ctx.restore();
	ctx.save();
	ctx.translate(canvas.width * 0.75, canvas.height * 0.25);
	ctx.rotate(Math.PI / 3.6);
	ctx.fillText("We are so", 0, - (textSize / 2));
	ctx.fillText("fucking back", 0, (textSize / 2));
	ctx.restore();
}

function renderTemplate2(ctx) {
	ctx.fillStyle = "firebrick";
	ctx.fillRect(0, 0, canvas.width * 0.166, canvas.height * 0.5);
	ctx.fillStyle = "chocolate";
	ctx.fillRect(canvas.width * 0.166, 0, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "lightcoral";
	ctx.fillRect(canvas.width * 0.333, 0, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "lightsalmon";
	ctx.fillRect(canvas.width * 0.5, 0, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "khaki";
	ctx.fillRect(canvas.width * 0.667, 0, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "goldenrod";
	ctx.fillRect(canvas.width * 0.834, 0, canvas.width * 0.166, canvas.height * 0.5);
	ctx.fillStyle = "cornflowerblue";
	ctx.fillRect(0, canvas.height * 0.5, canvas.width * 0.166, canvas.height * 0.5);
	ctx.fillStyle = "cadetblue";
	ctx.fillRect(canvas.width * 0.166, canvas.height * 0.5, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "paleturquoise";
	ctx.fillRect(canvas.width * 0.333, canvas.height * 0.5, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "darkseagreen";
	ctx.fillRect(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "lightgreen";
	ctx.fillRect(canvas.width * 0.667, canvas.height * 0.5, canvas.width * 0.167, canvas.height * 0.5);
	ctx.fillStyle = "darkolivegreen";
	ctx.fillRect(canvas.width * 0.834, canvas.height * 0.5, canvas.width * 0.166, canvas.height * 0.5);

	ctx.lineWidth = Math.min(canvas.width, canvas.height) * 0.005;
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(canvas.width * 0.166, 0);
	ctx.lineTo(canvas.width * 0.166, canvas.height);
	ctx.moveTo(canvas.width * 0.333, 0);
	ctx.lineTo(canvas.width * 0.333, canvas.height);
	ctx.moveTo(canvas.width * 0.5, 0);
	ctx.lineTo(canvas.width * 0.5, canvas.height);
	ctx.moveTo(canvas.width * 0.667, 0);
	ctx.lineTo(canvas.width * 0.667, canvas.height);
	ctx.moveTo(canvas.width * 0.834, 0);
	ctx.lineTo(canvas.width * 0.834, canvas.height);
	ctx.moveTo(0, canvas.height * 0.166);
	ctx.lineTo(canvas.width, canvas.height * 0.166);
	ctx.moveTo(0, canvas.height * 0.333);
	ctx.lineTo(canvas.width, canvas.height * 0.333);
	ctx.moveTo(0, canvas.height * 0.5);
	ctx.lineTo(canvas.width, canvas.height * 0.5);
	ctx.moveTo(0, canvas.height * 0.667);
	ctx.lineTo(canvas.width, canvas.height * 0.667);
	ctx.moveTo(0, canvas.height * 0.834);
	ctx.lineTo(canvas.width, canvas.height * 0.834);
	ctx.stroke();

	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	let textSize = Math.min(canvas.width, canvas.height) * 0.021;
	ctx.font = textSize + "px sans-serif";
	ctx.fillText("I am a", canvas.width * 0.083, (canvas.height * 0.083) - (textSize + (textSize / 2)));
	ctx.fillText("genuine", canvas.width * 0.083, (canvas.height * 0.083) - (textSize / 2));
	ctx.fillText("threat to", canvas.width * 0.083, (canvas.height * 0.083) + (textSize / 2));
	ctx.fillText("society", canvas.width * 0.083, (canvas.height * 0.083) + (textSize + (textSize / 2)));
	ctx.fillText("(In Minecraft)", canvas.width * 0.2495, (canvas.height * 0.083));
	ctx.fillText("Goblin", canvas.width * 0.4165, (canvas.height * 0.083) - (textSize / 2));
	ctx.fillText("Mode", canvas.width * 0.4165, (canvas.height * 0.083) + (textSize / 2));
	ctx.fillText("Silly", canvas.width * 0.5835, (canvas.height * 0.083) - (textSize / 2));
	ctx.fillText("Goose", canvas.width * 0.5835, (canvas.height * 0.083) + (textSize / 2));
	ctx.fillText("Let's", canvas.width * 0.7505, (canvas.height * 0.083) - (textSize / 2));
	ctx.fillText("gooooooo", canvas.width * 0.7505, (canvas.height * 0.083) + (textSize / 2));
	ctx.fillText("LETS FUCKING", canvas.width * 0.917, (canvas.height * 0.083) - (textSize / 2));
	ctx.fillText("GOOOOOOOO", canvas.width * 0.917, (canvas.height * 0.083) + (textSize / 2));

	ctx.fillText("You've got to", canvas.width * 0.083, (canvas.height * 0.2495) - textSize);
	ctx.fillText("be fucking", canvas.width * 0.083, (canvas.height * 0.2495));
	ctx.fillText("kidding me", canvas.width * 0.083, (canvas.height * 0.2495) + textSize);
	ctx.fillText("FUCK", canvas.width * 0.2495, (canvas.height * 0.2495));
	ctx.fillText("Fuck it", canvas.width * 0.4165, (canvas.height * 0.2495) - (textSize / 2));
	ctx.fillText("we ball", canvas.width * 0.4165, (canvas.height * 0.2495) + (textSize / 2));
	ctx.fillText("Bitches love", canvas.width * 0.5835, (canvas.height * 0.2495) - (textSize / 2));
	ctx.fillText("my mustache", canvas.width * 0.5835, (canvas.height * 0.2495) + (textSize / 2));
	ctx.fillText("We're so", canvas.width * 0.7505, (canvas.height * 0.2495) - (textSize / 2));
	ctx.fillText("back", canvas.width * 0.7505, (canvas.height * 0.2495) + (textSize / 2));
	ctx.fillText("We're so", canvas.width * 0.917, (canvas.height * 0.2495) - (textSize / 2));
	ctx.fillText("fucking back", canvas.width * 0.917, (canvas.height * 0.2495) + (textSize / 2));

	ctx.fillText("I hate", canvas.width * 0.083, (canvas.height * 0.4165) - (textSize / 2));
	ctx.fillText("everyone", canvas.width * 0.083, (canvas.height * 0.4165) + (textSize / 2));
	ctx.fillText("I don't think we", canvas.width * 0.2495, (canvas.height * 0.4165) - textSize);
	ctx.fillText("making it out of", canvas.width * 0.2495, (canvas.height * 0.4165));
	ctx.fillText("the hood bro", canvas.width * 0.2495, (canvas.height * 0.4165) + textSize);
	ctx.fillText("*Internal", canvas.width * 0.4165, (canvas.height * 0.4165) - (textSize / 2));
	ctx.fillText("screaming*", canvas.width * 0.4165, (canvas.height * 0.4165) + (textSize / 2));
	ctx.fillText("It is", canvas.width * 0.5835, (canvas.height * 0.4165) - textSize);
	ctx.fillText("what it", canvas.width * 0.5835, (canvas.height * 0.4165));
	ctx.fillText("is", canvas.width * 0.5835, (canvas.height * 0.4165) + textSize);
	ctx.fillText("We're gonna", canvas.width * 0.7505, (canvas.height * 0.4165) - (textSize / 2));
	ctx.fillText("make it bro", canvas.width * 0.7505, (canvas.height * 0.4165) + (textSize / 2));
	ctx.fillText("Modelo", canvas.width * 0.917, (canvas.height * 0.4165) - (textSize / 2));
	ctx.fillText("time", canvas.width * 0.917, (canvas.height * 0.4165) + (textSize / 2));

	ctx.fillText("It's the kind", canvas.width * 0.083, (canvas.height * 0.5835) - (textSize + (textSize / 2)));
	ctx.fillText("of tired that", canvas.width * 0.083, (canvas.height * 0.5835) - (textSize / 2));
	ctx.fillText("sleep won't", canvas.width * 0.083, (canvas.height * 0.5835) + (textSize / 2));
	ctx.fillText("fix...", canvas.width * 0.083, (canvas.height * 0.5835) + (textSize + (textSize / 2)));
	ctx.fillText("It's just", canvas.width * 0.2495, (canvas.height * 0.5835) - (textSize + (textSize / 2)));
	ctx.fillText("one of", canvas.width * 0.2495, (canvas.height * 0.5835) - (textSize / 2));
	ctx.fillText("those", canvas.width * 0.2495, (canvas.height * 0.5835) + (textSize / 2));
	ctx.fillText("days...", canvas.width * 0.2495, (canvas.height * 0.5835) + (textSize + (textSize / 2)));
	ctx.fillText("yeah bro, I", canvas.width * 0.4165, (canvas.height * 0.5835) - textSize);
	ctx.fillText("just need", canvas.width * 0.4165, (canvas.height * 0.5835));
	ctx.fillText("some sleep", canvas.width * 0.4165, (canvas.height * 0.5835) + textSize);
	ctx.fillText("It really do", canvas.width * 0.5835, (canvas.height * 0.5835) - textSize);
	ctx.fillText("be like that", canvas.width * 0.5835, (canvas.height * 0.5835));
	ctx.fillText("sometimes", canvas.width * 0.5835, (canvas.height * 0.5835) + textSize);
	ctx.fillText("Straight", canvas.width * 0.7505, (canvas.height * 0.5835) - (textSize / 2));
	ctx.fillText("chilling", canvas.width * 0.7505, (canvas.height * 0.5835) + (textSize / 2));
	ctx.fillText("\"neat\"", canvas.width * 0.917, (canvas.height * 0.5835));

	ctx.fillText("My", canvas.width * 0.083, (canvas.height * 0.7505) - (textSize + (textSize / 2)));
	ctx.fillText("mom", canvas.width * 0.083, (canvas.height * 0.7505) - (textSize / 2));
	ctx.fillText("would", canvas.width * 0.083, (canvas.height * 0.7505) + (textSize / 2));
	ctx.fillText("be sad", canvas.width * 0.083, (canvas.height * 0.7505) + (textSize + (textSize / 2)));
	ctx.fillText("It's so", canvas.width * 0.2495, (canvas.height * 0.7505) - (textSize / 2));
	ctx.fillText("over", canvas.width * 0.2495, (canvas.height * 0.7505) + (textSize / 2));
	ctx.fillText("This time", canvas.width * 0.4165, (canvas.height * 0.7505) - textSize);
	ctx.fillText("I'm really", canvas.width * 0.4165, (canvas.height * 0.7505));
	ctx.fillText("gonna do it", canvas.width * 0.4165, (canvas.height * 0.7505) + textSize);
	ctx.fillText("Anotha day,", canvas.width * 0.5835, (canvas.height * 0.7505) - (textSize / 2));
	ctx.fillText("anotha dolla", canvas.width * 0.5835, (canvas.height * 0.7505) + (textSize / 2));
	ctx.fillText("\"cool\"", canvas.width * 0.7505, (canvas.height * 0.7505));
	ctx.fillText("We", canvas.width * 0.917, (canvas.height * 0.7505) - (textSize / 2));
	ctx.fillText("vibing", canvas.width * 0.917, (canvas.height * 0.7505) + (textSize / 2));

	ctx.fillText("I geuss", canvas.width * 0.083, (canvas.height * 0.917) - (textSize + (textSize / 2)));
	ctx.fillText("that's it", canvas.width * 0.083, (canvas.height * 0.917) - (textSize / 2));
	ctx.fillText("(Ronnie", canvas.width * 0.083, (canvas.height * 0.917) + (textSize / 2));
	ctx.fillText("McNutt)", canvas.width * 0.083, (canvas.height * 0.917) + (textSize + (textSize / 2)));
	ctx.fillText("My dog", canvas.width * 0.2495, (canvas.height * 0.917) - textSize);
	ctx.fillText("wouldn't", canvas.width * 0.2495, (canvas.height * 0.917));
	ctx.fillText("understand", canvas.width * 0.2495, (canvas.height * 0.917) + textSize);
	ctx.fillText("One day", canvas.width * 0.4165, (canvas.height * 0.917) - textSize);
	ctx.fillText("something", canvas.width * 0.4165, (canvas.height * 0.917));
	ctx.fillText("will kill me", canvas.width * 0.4165, (canvas.height * 0.917) + textSize);
	ctx.fillText("Comfortably", canvas.width * 0.5835, (canvas.height * 0.917) - (textSize / 2));
	ctx.fillText("numb", canvas.width * 0.5835, (canvas.height * 0.917) + (textSize / 2));
	ctx.fillText("\"aight\"", canvas.width * 0.7505, (canvas.height * 0.917));
	ctx.fillText("I'm", canvas.width * 0.917, (canvas.height * 0.917) - textSize);
	ctx.fillText("Bing", canvas.width * 0.917, (canvas.height * 0.917));
	ctx.fillText("chilling", canvas.width * 0.917, (canvas.height * 0.917) + textSize);
}

function addNotes(timestamp) {
	let point = mood_data.find(element => new Date(element.timestamp).valueOf() == new Date(timestamp).valueOf());

	let oldnotes = "";

	if (point.notes != undefined) {
		oldnotes = point.notes;
	}

	let notes = window.prompt("What notes would you like to add to the data point recorded on " + new Date(point.timestamp).toLocaleString() + "?", oldnotes);

	if (notes == null) {
		return;
	}

	point.notes = notes;
	window.localStorage.setItem("mood_data", JSON.stringify(mood_data));

	let row = Array.from(table.rows).find(row => row.cells[0].innerText == new Date(timestamp).toLocaleDateString() && row.cells[1].innerText == new Date(timestamp).toLocaleTimeString() && row.cells[2].innerText == "(" + Math.round(point.valence * 1000) / 100 + ", " + Math.round(point.arousal * 1000) / 100 + ")");

	row.cells[3].innerText = "";
	row.cells[3].appendChild(document.createTextNode(notes));
}

function addTableRow(table, dataT, dataX, dataY, notes) {
	let row = table.insertRow(1);

	row.insertCell().innerText = new Date(dataT).toLocaleDateString();
	row.insertCell().innerText = new Date(dataT).toLocaleTimeString();
	row.insertCell().innerHTML = "<a href='javascript:void(0)'>(" + Math.round(dataX * 1000) / 100 + ", " + Math.round(dataY * 1000) / 100 + ")</a>";

	if (notes == undefined) {
		row.insertCell().innerText = "";
	} else {
		row.insertCell().appendChild(document.createTextNode(notes));
	}

	row.onclick = function () {
		addNotes(dataT);
	};
}

function clearTable(table) {
	for (var i = 1, row; row = table.rows.length - 1; i++) {
		table.deleteRow(1);
	}
}

function addData(dataT, dataX, dataY, notes) {
	if ((mood_data.length > 0) && (dataT - mood_data[mood_data.length - 1].timestamp < 60 * 1000 * config.minimum_minutes)) {
		let oldnotes = mood_data[mood_data.length - 1].notes;
		if (oldnotes != undefined && notes == "") {
			notes = oldnotes;
		}

		table.deleteRow(1);
		mood_data.pop();
	}

	addTableRow(table, dataT, dataX, dataY, notes);
	mood_data.push({ timestamp: new Date(dataT), valence: dataX, arousal: dataY, notes: notes });

	truncateData(table);
	window.localStorage.setItem("mood_data", JSON.stringify(mood_data));
}

function truncateData(table) {
	while (mood_data.length > config.maximum_data_points) {
		table.deleteRow(table.rows.length - 1);
		mood_data.shift();
	}
}

function loadData(dataString, saveData) {
	if (dataString == null) {
		dataString = "[]";
	}

	mood_data = JSON.parse(dataString);
	for (var i = 0; i < mood_data.length; i++) {
		mood_data[i].timestamp = new Date(mood_data[i].timestamp);
	}
	mood_data.sort(function (a, b) {
		return a.timestamp - b.timestamp;
	});

	clearTable(table);
	for (var i = 0; i < mood_data.length; i++) {
		addTableRow(table, mood_data[i].timestamp, mood_data[i].valence, mood_data[i].arousal, mood_data[i].notes);
	}

	if (saveData) {
		truncateData(table);
		window.localStorage.setItem("mood_data", JSON.stringify(mood_data));
	}
}

function clearData() {
	if (window.confirm("Do you really want to clear all recorded mood data?")) {
		mood_data = [];
		window.localStorage.removeItem("mood_data");
		clearTable(table);
		ctx.drawImage(canvas.templateCanvas, 0, 0);
	}
}

function handleCanvasClick(event) {
	let dataT = new Date();
	let dataX = (event.offsetX / canvas.offsetWidth);
	let dataY = (1 - (event.offsetY / canvas.offsetHeight));

	addData(dataT, dataX, dataY, "");

	if (config.data_hide_time > 0) {
		graphData(1);

		setTimeout(handleCanvasAfterClick, config.data_hide_time * 1000);
	} else {
		graphData(config.maximum_graphed_points);
	}

}

function handleCanvasAfterClick() {
	if (new Date() - mood_data[mood_data.length - 1].timestamp > ((config.data_hide_time * 1000) - 100)) {
		graphData(config.maximum_graphed_points);
	}
}

function handleDataUpdate(event) {
	if (event.key === "config") {
		loadConfig(event.newValue);
		loadTheme();
	}
	if (event.key === "mood_data") {
		loadData(event.newValue, false);
	}
	graphData(config.maximum_graphed_points);
}

function handleFileDownload() {
	let blob = new Blob([JSON.stringify(mood_data)], { type: "text/json" });

	download_link.download = "mood_data-" + Date.now() + ".json";
	download_link.href = URL.createObjectURL(blob);
	download_link.click();
}

function handleCSVFileDownload() {
	let csv = "Date & Time,Pleasantness,Energy,Notes\n";

	for (var i = 0; i < mood_data.length; i++) {
		if (mood_data[i].notes != undefined) {
			var notes = JSON.stringify(mood_data[i].notes);
		} else {
			var notes = "";
		};

		csv += new Date(mood_data[i].timestamp).toDateString() + " " + new Date(mood_data[i].timestamp).toLocaleTimeString("en") + "," + Math.round(mood_data[i].valence * 1000) / 100 + "," + Math.round(mood_data[i].arousal * 1000) / 100 + "," + notes + "\n";
	}

	let blob = new Blob([csv], { type: "text/csv" });

	download_link.download = "mood_data-" + Date.now() + ".csv";
	download_link.href = URL.createObjectURL(blob);
	download_link.click();
}

function handleGraphDownload() {
	download_link.download = "mood_graph-" + Date.now() + ".png";
	download_link.href = canvas.toDataURL('image/png');
	download_link.click();
}

function handleFileUpload() {
	const [file] = document.querySelector("input[type=file]").files;
	const reader = new FileReader();

	reader.addEventListener(
		"load",
		() => {
			loadData(reader.result, true);
			graphData(config.maximum_graphed_points);
		},
		false
	);

	if (file) {
		reader.readAsText(file);
	}
}

function loadTheme() {
	switch (config.theme) {
		case "1":
			renderTemplate1(offscreen_ctx);
			break;
		case "2":
			renderTemplate2(offscreen_ctx);
			break;
		default:
			renderTemplate0(offscreen_ctx);
	}
}

function loadConfig(configString) {
	if (configString == null) {
		configString = JSON.stringify(default_config);
	}

	config = JSON.parse(configString);

	if (config.moods_open) {
		mood_menu.setAttribute("open", "");
	} else {
		mood_menu.removeAttribute("open");
	}
	if (config.settings_open) {
		settings_menu.setAttribute("open", "");
	} else {
		settings_menu.removeAttribute("open");
	}
	theme_input.value = config.theme;
	data_limit_input.value = config.maximum_data_points;
	data_graph_limit_input.value = config.maximum_graphed_points;
	data_combine_input.value = config.minimum_minutes;
	data_hide_input.value = config.data_hide_time;
}

function writeConfig() {
	config.moods_open = mood_menu.hasAttribute("open");
	config.settings_open = settings_menu.hasAttribute("open");
	config.theme = theme_input.value;
	config.maximum_data_points = data_limit_input.value;
	config.maximum_graphed_points = data_graph_limit_input.value;
	config.minimum_minutes = data_combine_input.value;
	config.data_hide_time = data_hide_input.value;

	window.localStorage.setItem("config", JSON.stringify(config));
}

function resetConfig() {
	if (window.confirm("Do you really want to reset settings to defaults?")) {
		loadConfig(null);
		settings_menu.setAttribute("open", "");
		writeConfig();
	}
}

function graphData(items) {
	ctx.drawImage(canvas.templateCanvas, 0, 0);

	let dotSize = Math.min(canvas.width, canvas.height) * 0.06;
	let start = Math.max(mood_data.length - items, 0);

	ctx.lineWidth = Math.min(canvas.width, canvas.height) * 0.006;

	for (var i = start; i < mood_data.length; i++) {
		let value = (mood_data[i].timestamp - mood_data[start].timestamp) / (mood_data[mood_data.length - 1].timestamp - mood_data[start].timestamp);

		value2 = (i - start) / ((mood_data.length - 1) - start);

		if (isNaN(value)) {
			value = 1;
		}

		if (isNaN(value2)) {
			value2 = 1;
		}

		ctx.fillStyle = "hsl(" + 300 + " " + ((value * 40) + 60) + "% " + ((value2 * 20) + (value * 20)) + "% / 0.6)";
		ctx.strokeStyle = "hsl(" + 300 + " " + ((value * 40) + 60) + "% " + ((value2 * 20) + (value * 20)) + "% / 0.5)";

		if ((i == mood_data.length - 1) && ((new Date() - mood_data[i].timestamp < 60 * 1000 * config.minimum_minutes) || (config.minimum_minutes == 0))) {
			ctx.fillStyle = "hsl(300 100% 50% / 0.9)";
			ctx.strokeStyle = "hsl(300 100% 50% / 0.5)";
		}

		ctx.beginPath();
		ctx.moveTo(mood_data[Math.max(i - 1, start)].valence * canvas.width, (1 - mood_data[Math.max(i - 1, start)].arousal) * canvas.height);
		ctx.lineTo(mood_data[i].valence * canvas.width, (1 - mood_data[i].arousal) * canvas.height);
		ctx.stroke();

		ctx.fillRect((mood_data[i].valence * canvas.width) - (dotSize / 2), ((1 - mood_data[i].arousal) * canvas.height) - (dotSize / 2), dotSize, dotSize);
	}
}

function heatmapData() {
	ctx.drawImage(canvas.templateCanvas, 0, 0);
	let dotSize = Math.min(canvas.width, canvas.height) * 0.2;

	ctx.fillStyle = "hsl(300 100% 19% / " + Math.min(Math.max(0.2 / Math.log10(mood_data.length), 0.01), 0.75) + ")";

	for (var i = 0; i < mood_data.length; i++) {
		ctx.fillRect((mood_data[i].valence * canvas.width) - (dotSize / 2), ((1 - mood_data[i].arousal) * canvas.height) - (dotSize / 2), dotSize, dotSize);
	}

}

function handleForceUpdate() {
	if (navigator.onLine || window.confirm("You appear to be offline, are you sure you want to clear the cache?")) {
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			for (let registration of registrations) {
				registration.unregister();
			}
			location.reload();
		});
	}
}

loadConfig(window.localStorage.getItem("config"));

loadData(window.localStorage.getItem("mood_data"), false);
window.addEventListener('storage', handleDataUpdate);

loadTheme();
graphData(config.maximum_graphed_points);
canvas.addEventListener("click", handleCanvasClick);

mood_menu.addEventListener("toggle", (event) => {
	writeConfig();
});

settings_menu.addEventListener("toggle", (event) => {
	writeConfig();
});

theme_input.onchange = function () {
	writeConfig();
	loadTheme();
	graphData(config.maximum_graphed_points);
};

data_limit_input.onchange = function () {
	if (mood_data.length - 10 > data_limit_input.value) {
		if (!(window.confirm("Do you really want to remove " + (mood_data.length - data_limit_input.value) + " data points?"))) {
			data_limit_input.value = config.maximum_data_points;
			return;
		}
	}

	writeConfig();
	truncateData(table);
	graphData(config.maximum_graphed_points);
	window.localStorage.setItem("mood_data", JSON.stringify(mood_data));
};

data_graph_limit_input.onchange = function () {
	writeConfig();
	graphData(config.maximum_graphed_points);
};

data_combine_input.onchange = function () {
	writeConfig();
	graphData(config.maximum_graphed_points);
};

data_hide_input.onchange = function () {
	writeConfig();
	graphData(config.maximum_graphed_points);
};

if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	document.getElementById("cache_button").style.display = "none";
} else {
	navigator.serviceWorker.register("worker.js");
	document.getElementById("cache_button").innerText = "Clear cache (v" + new Date(document.lastModified).toISOString().split(".")[0] + ")";
}
