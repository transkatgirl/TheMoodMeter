navigator.serviceWorker.register("worker.js");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.templateCanvas = document.createElement("canvas");
canvas.templateCanvas.width = canvas.width;
canvas.templateCanvas.height = canvas.height;

const offscreen_ctx = canvas.templateCanvas.getContext("2d");

const table = document.getElementById("table");

var mood_data = [];
var config = { moods_open: true, settings_open: false, theme: "1", maximum_data_points: 900, maximum_graphed_points: 15, minimum_minutes: 2, data_hide_time: 2.5 };

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
	ctx.fillText("women", canvas.width * 0.083, (canvas.height * 0.4165) + (textSize / 2));
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

function addTableRow(table, dataT, dataX, dataY) {
	let row = table.insertRow(1);

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
		table.deleteRow(1);
		mood_data.pop();
	}

	addTableRow(table, dataT, dataX, dataY);
	mood_data.push({ timestamp: dataT, valence: dataX, arousal: dataY });

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
	mood_data.sort(function (a, b) {
		return a.timestamp - b.timestamp;
	});

	clearTable(table);
	for (var i = 0; i < mood_data.length; i++) {
		addTableRow(table, mood_data[i].timestamp, mood_data[i].valence, mood_data[i].arousal);
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
	let dataT = Date.now();
	let dataX = (event.offsetX / canvas.offsetWidth);
	let dataY = (1 - (event.offsetY / canvas.offsetHeight));

	addData(dataT, dataX, dataY);

	if (config.data_hide_time > 0) {
		graphData(1);

		setTimeout(handleCanvasAfterClick, config.data_hide_time * 1000);
	} else {
		graphData(config.maximum_graphed_points);
	}

}

function handleCanvasAfterClick() {
	if (Date.now() - mood_data[mood_data.length - 1].timestamp > ((config.data_hide_time * 1000) - 100)) {
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

function handleGraphDownload() {
	download_link.download = "mood_data-" + Date.now() + ".png";
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
		configString = '{"moods_open": true, "settings_open": false, "theme": "1", "maximum_data_points": 900, "maximum_graphed_points": 15, "minimum_minutes": 2, "data_hide_time": 2.5}';
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

function graphData(items) {
	ctx.drawImage(canvas.templateCanvas, 0, 0);

	let dotSize = Math.min(canvas.width, canvas.height) * 0.06;
	let start = Math.max(mood_data.length - items, 0);

	ctx.lineWidth = Math.min(canvas.width, canvas.height) * 0.006;

	for (var i = start; i < mood_data.length; i++) {
		let value = 100 * ((mood_data[i].timestamp - mood_data[start].timestamp) / (mood_data[mood_data.length - 1].timestamp - mood_data[start].timestamp));

		value = value + (100 * (i - start) / ((mood_data.length - 1) - start));

		ctx.fillStyle = "rgba(" + value + ",0," + value + ",0.6)";
		ctx.strokeStyle = "rgba(" + value + ",0," + value + ",0.5)";

		if ((i == mood_data.length - 1) && ((Date.now() - mood_data[i].timestamp < 60 * 1000 * config.minimum_minutes) || (config.minimum_minutes == 0))) {
			ctx.fillStyle = "rgba(255,0,255,0.9)";
			ctx.strokeStyle = "rgba(255,0,255,0.5)";
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

	ctx.fillStyle = "rgba(96,0,96," + Math.min(Math.max(0.2 / Math.log10(mood_data.length), 0.01), 0.75) + ")";

	for (var i = 0; i < mood_data.length; i++) {
		ctx.fillRect((mood_data[i].valence * canvas.width) - (dotSize / 2), ((1 - mood_data[i].arousal) * canvas.height) - (dotSize / 2), dotSize, dotSize);
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