// UNCOMMENT TO ALLOW OFFLINE USAGE
//navigator.serviceWorker.register("/worker.js");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.templateCanvas = document.createElement("canvas");
canvas.templateCanvas.width = canvas.width;
canvas.templateCanvas.height = canvas.height;

const offscreen_ctx = canvas.templateCanvas.getContext("2d");

const table = document.getElementById("table");

var mood_data = [];
var config = { theme: 1, reminders: false, reminders_per_day: 3, maximum_data_points: 900, minimum_minutes: 2 };

const download_link = document.getElementById("download");

const theme_input = document.getElementById("theme");
const reminder_input = document.getElementById("enableReminders");
const reminder_count_input = document.getElementById("reminderAmount");
const data_limit_input = document.getElementById("maxData");
const data_combine_input = document.getElementById("minTime");

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

// TODO
function renderTemplate2(ctx) {
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function addTableRow(table, dataT, dataX, dataY) {
	let row = table.insertRow();

	row.insertCell().innerHTML = new Date(dataT).toLocaleDateString();
	row.insertCell().innerHTML = new Date(dataT).toLocaleTimeString();
	row.insertCell().innerHTML = Math.round(dataX * 1000) / 100;
	row.insertCell().innerHTML = Math.round(dataY * 1000) / 100;
}

function clearTable(table) {
	for (var i = 1, row; row = table.rows.length - 1; i++) {
		table.deleteRow(1);
	}
}

function addData(dataT, dataX, dataY) {
	if ((mood_data.length > 0) && (dataT - mood_data[mood_data.length - 1].timestamp < 60 * 1000 * config.minimum_minutes)) {
		table.deleteRow(table.rows.length - 1);
		mood_data.pop();
	}

	addTableRow(table, dataT, dataX, dataY);
	mood_data.push({ timestamp: dataT, valence: dataX, arousal: dataY });

	truncateData(table);
	window.localStorage.setItem("mood_data", JSON.stringify(mood_data));
}

function truncateData(table) {
	while (mood_data.length > config.maximum_data_points) {
		table.deleteRow(1);
		mood_data.shift();
	}
}

function loadData(dataString, saveData) {
	if (dataString == null) {
		dataString = "[]";
	}

	mood_data = JSON.parse(dataString);
	mood_data.sort(function (a, b) {
		return a.timestamp - b.timestamp;
	});

	clearTable(table);
	for (var i = 0; i < mood_data.length; i++) {
		addTableRow(table, mood_data[i].timestamp, mood_data[i].valence, mood_data[i].arousal);
	}
	ctx.drawImage(canvas.templateCanvas, 0, 0);

	if (saveData) {
		truncateData(table);
		window.localStorage.setItem("mood_data", JSON.stringify(mood_data));
	}
}

function clearData() {
	mood_data = [];
	window.localStorage.removeItem("mood_data");
	clearTable(table);
	ctx.drawImage(canvas.templateCanvas, 0, 0);
}

function handleCanvasClick(event) {
	let dataT = Date.now();
	let dataX = (event.offsetX / canvas.offsetWidth);
	let dataY = (1 - (event.offsetY / canvas.offsetHeight));

	let dotSize = Math.min(canvas.width, canvas.height) * 0.06;

	ctx.drawImage(canvas.templateCanvas, 0, 0);
	ctx.fillStyle = "black";
	ctx.fillRect((dataX * canvas.width) - (dotSize / 2), ((1 - dataY) * canvas.height) - (dotSize / 2), dotSize, dotSize);

	addData(dataT, dataX, dataY);
}

function handleDataUpdate(event) {
	if (event.key === "config") {
		loadConfig(event.newValue);
		loadTheme();
	}
	if (event.key === "mood_data") {
		loadData(event.newValue, false);
	}
	ctx.drawImage(canvas.templateCanvas, 0, 0);
}

function handleFileDownload() {
	let blob = new Blob([JSON.stringify(mood_data)], { type: "text/json" });

	download_link.download = "mood_data-" + Date.now() + ".json";
	download_link.href = URL.createObjectURL(blob);
	download_link.click();
}

function handleFileUpload() {
	const [file] = document.querySelector("input[type=file]").files;
	const reader = new FileReader();

	reader.addEventListener(
		"load",
		() => {
			loadData(reader.result, true);
			document.querySelector("input[type=file]").value = '';
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
		configString = '{"theme": 1, "reminders": false, "reminders_per_day": 3, "maximum_data_points": 900, "minimum_minutes": 2}';
	}

	config = JSON.parse(configString);

	theme_input.value = config.theme;
	reminder_input.value = config.reminders;
	reminder_count_input.value = config.reminders_per_day;
	data_limit_input.value = config.maximum_data_points;
	data_combine_input.value = config.minimum_minutes;
}

function writeConfig() {
	config.theme = theme_input.value;
	config.reminders = reminder_input.value;
	config.reminders_per_day = reminder_count_input.value;
	config.maximum_data_points = data_limit_input.value;
	config.minimum_minutes = data_combine_input.value;

	window.localStorage.setItem("config", JSON.stringify(config));
}

loadConfig(window.localStorage.getItem("config"));

loadData(window.localStorage.getItem("mood_data"), false);
window.addEventListener('storage', handleDataUpdate);

loadTheme();
ctx.drawImage(canvas.templateCanvas, 0, 0);
canvas.addEventListener("click", handleCanvasClick);

theme_input.onchange = function () {
	writeConfig();
	loadTheme();
	ctx.drawImage(canvas.templateCanvas, 0, 0);
};

reminder_input.onchange = function () {
	writeConfig();
	//TODO
};

reminder_count_input.onchange = function () {
	writeConfig();
	//TODO
};

data_limit_input.onchange = function () {
	writeConfig();
	truncateData(table);
	window.localStorage.setItem("mood_data", JSON.stringify(mood_data));
};

data_combine_input.onchange = function () {
	writeConfig();
};
