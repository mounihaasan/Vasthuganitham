const selectedValues = [
    "nak", "aysh", "adym", "karch", "aym", "vrm", "tidhi", 
    "dikpth", "amsa", "ygm", "karnm", "thvm", "kulm", "lagnam"
];

// Generate checkboxes dynamically
const checkboxContainer = document.getElementById("checkboxes");
selectedValues.forEach(value => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = value;
    checkbox.value = value;

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(value));

    checkboxContainer.appendChild(label);
});

function calculate() {
    const aa = parseInt(document.getElementById("aa").value) || 0;
    const bb = parseInt(document.getElementById("bb").value) || 0;
    const cc = parseInt(document.getElementById("cc").value) || 0;
    const dd = parseInt(document.getElementById("dd").value) || 0;
    const vv = parseInt(document.getElementById("vv").value) || 0;
    const xx = parseInt(document.getElementById("xx").value) || 0;
    const yy = parseInt(document.getElementById("yy").value) || 0;
    const zz = parseInt(document.getElementById("zz").value) || 0;
    const oo = parseInt(document.getElementById("oo").value) || 0;

    const a = (aa * 12) + bb;
    const b = (cc * 12) + dd;
    const c = (vv * 12) + xx;
    const d = (yy * 12) + zz;

    let count = 0;
    let resultsHtml = "";

    for (let e = a; e <= b; e++) {
        for (let f = c; f <= d; f++) {
            const g = e, h = f;
            const i = (g * h) / 144;
            const j = Math.floor(g / 12);
            const k = g % 12;
            const l = Math.floor(h / 12);
            const m = h % 12;

            let values = {};

            document.querySelectorAll("#checkboxes input:checked").forEach(checkbox => {
                let key = checkbox.value;
                switch (key) {
                    case "aysh": values[key] = Math.ceil((i * 9) % 120) || 120; break;
                    case "adym": values[key] = Math.ceil((i * 8) % 12) || 12; break;
                    case "karch": values[key] = Math.ceil((i * 3) % 8) || 8; break;
                    case "aym": values[key] = Math.ceil((i * 9) % 8) || 8; break;
                    case "nak": values[key] = Math.ceil((i * 8) % 27) || 27; break;
                    case "vrm": values[key] = Math.ceil((i * 9) % 7) || 7; break;
                    case "tidhi": values[key] = Math.ceil((i * 6) % 30) || 30; break;
                    case "dikpth": values[key] = Math.ceil((i * 9) % 8) || 8; break;
                    case "amsa": values[key] = Math.ceil((i * 6) % 9) || 9; break;
                    case "ygm": values[key] = Math.ceil((i * 4) % 27) || 27; break;
                    case "karnm": values[key] = Math.ceil((i * 5) % 7) || 7; break;
                    case "thvm": values[key] = Math.ceil((i * 7) % 5) || 5; break;
                    case "kulm": values[key] = Math.ceil((i * 9) % 4) || 4; break;
                    case "lagnam": values[key] = Math.ceil((i * 9) % 12) || 12; break;
                }
            });

            // Filtering conditions (simplified)
            if (values["lagnam"] && ![2, 3, 4, 6, 7, 9, 12].includes(values["lagnam"])) continue;
            if (values["thvm"] && ![1, 2].includes(values["thvm"])) continue;
            if (values["karnm"] && ![3, 4, 5, 6].includes(values["karnm"])) continue;

            count++;
            resultsHtml += `<p>${i.toFixed(2)} (${j}-${k}, ${l}-${m}) → ${JSON.stringify(values)}</p>`;
        }
    }

    document.getElementById("results").innerHTML = count ? resultsHtml : "<p>No results found.</p>";
}
