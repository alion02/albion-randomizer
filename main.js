// Store build div
let build = document.querySelector("#build");

// Store hook button
let roll = document.querySelector("#roll");

// Load item list
let items = await fetch("./items.json").then(r => r.json());

// Items loaded - hook and enable button
roll.addEventListener("click", () => {
	function flatRandom(arr) {
		arr = arr.flat(Infinity);
		return arr[Math.floor(Math.random() * arr.length)];
	}

	// Roll the basic 4 items
	let rolledItems = ["helmet", "armor", "shoes", "weapon"]
		.map(type => items[type])
		.map(flatRandom);

	// If the rolled weapon isn't two-handed, roll an off-hand
	if (rolledItems[3].id[0] !== "2") {
		rolledItems.push(flatRandom(items.offhand));
	}

	// Update the displayed build
	build.replaceChildren(...rolledItems.map(item => {
		let img = document.createElement("img");
		img.width = img.height = 217;
		img.src = `https://render.albiononline.com/v1/item/T4_${item.id}.png`;
		img.alt = item.name;
		return img;
	}));
});
roll.removeAttribute("disabled");
