from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Vasthu Ganitham API is running"}), 200

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        if not data or "selected_values" not in data or "inputs" not in data:
            return jsonify({"error": "Invalid input format"}), 400

        selected_values = data["selected_values"]
        
        if len(data["inputs"]) != 9:
            return jsonify({"error": "Expected 9 inputs"}), 400

        try:
            aa, bb, cc, dd, vv, xx, yy, zz, oo = map(int, data["inputs"])
        except ValueError:
            return jsonify({"error": "Inputs must be integers"}), 400

        count = 0
        a = (aa * 12) + bb
        b = (cc * 12) + dd
        c = (vv * 12) + xx
        d = (yy * 12) + zz

        results = []
        for e in range(a, b + 1):
            for f in range(c, d + 1):
                i = (e * f) / 144
                values = {}

                if "aysh" in selected_values:
                    values["aysh"] = max(1, (i * 9) % 120)  # Ensuring min 1
                if "adym" in selected_values:
                    values["adym"] = max(1, (i * 8) % 12)
                if "karch" in selected_values:
                    values["karch"] = max(1, (i * 3) % 8)
                if "nak" in selected_values:
                    values["nak"] = max(1, (i * 8) % 27)

                if "aysh" in selected_values and values["aysh"] <= 60:
                    continue  # Skip this result

                count += 1
                results.append(values)

        return jsonify(results=results, count=count, status="success")

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Catch unexpected errors

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=10000)
