from flask import Flask, request, jsonify
import math

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    selected_values = data["selected_values"]
    aa, bb, cc, dd, vv, xx, yy, zz, oo = map(int, data["inputs"])

    count = 0
    a = (aa * 12) + bb
    b = (cc * 12) + dd
    c = (vv * 12) + xx
    d = (yy * 12) + zz

    results = []
    for e in range(a, b + 1):
        for f in range(c, d + 1):
            g, h = e, f
            i = (g * h) / 144
            values = {}

            if "aysh" in selected_values:
                values["aysh"] = math.ceil((i * 9) % 120) or 120
            if "adym" in selected_values:
                values["adym"] = math.ceil((i * 8) % 12) or 12
            if "karch" in selected_values:
                values["karch"] = math.ceil((i * 3) % 8) or 8
            if "nak" in selected_values:
                values["nak"] = math.ceil((i * 8) % 27) or 27

            conditions_met = True
            if "aysh" in selected_values and values["aysh"] <= 60:
                conditions_met = False

            if conditions_met:
                count += 1
                results.append(values)

    return jsonify(results=results, count=count)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
