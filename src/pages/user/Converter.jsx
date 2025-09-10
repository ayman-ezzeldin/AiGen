import { useState } from "react";

export default function Converter() {
  const [convertedText, setConvertedText] = useState("");
  const [downloadName, setDownloadName] = useState("output.json");

  // تحويل ainoprj → JSON
  const ainoprjToJSON = (text) => {
    const nodes = [];
    const nodeBlocks = text.split("NODE_START").slice(1); 
    nodeBlocks.forEach(block => {
      const node = {};
      const lines = block.split("\n").map(line => line.trim()).filter(Boolean);
      lines.forEach(line => {
        if (line.startsWith("NODE_END")) return;
        const [key, value, type] = line.split("=");
        switch (type) {
          case "int":
            node[key] = Number(value);
            break;
          case "str":
            node[key] = value;
            break;
          case "list":
          case "dict":
            try {
              node[key] = JSON.parse(value.replace(/'/g, '"'));
            } catch {
              node[key] = value;
            }
            break;
          default:
            node[key] = value;
        }
      });
      nodes.push(node);
    });
    return JSON.stringify({ nodes }, null, 2);
  };

  // تحويل JSON → ainoprj
  const jsonToAinoprj = (jsonText) => {
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (e) {
      alert("Invalid JSON file");
      return "";
    }

    let ainoprj = "AINOPRJ_START\n";

    // Add top-level keys (except nodes) first
    for (const key in data) {
      if (key !== "nodes") {
        let value = data[key];
        let type = "str";

        if (typeof value === "number") type = "int";
        else if (Array.isArray(value)) {
          type = "list";
          value = JSON.stringify(value);
        } else if (typeof value === "object" && value !== null) {
          type = "dict";
          value = JSON.stringify(value);
        }

        ainoprj += `\t${key}=${value}=${type}\n`;
      }
    }

    // Convert nodes
    const nodes = data.nodes || [];
    nodes.forEach((node) => {
      ainoprj += "\tNODE_START\n";
      for (const key in node) {
        const value = node[key];
        let type = "str";
        let valStr = value;

        if (typeof value === "number") type = "int";
        else if (Array.isArray(value)) {
          type = "list";
          valStr = JSON.stringify(value);
        } else if (typeof value === "object" && value !== null) {
          type = "dict";
          valStr = JSON.stringify(value);
        }

        ainoprj += `\t\t${key}=${valStr}=${type}\n`;
      }
      ainoprj += "\tNODE_END\n";
    });

    ainoprj += "AINOPRJ_END";
    return ainoprj;
  };

  // عند رفع ملف
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;

      if (file.name.endsWith(".ainoprj")) {
        const result = ainoprjToJSON(content);
        setConvertedText(result);
        setDownloadName(file.name.replace(".ainoprj", ".json"));
      } else if (file.name.endsWith(".json")) {
        const result = jsonToAinoprj(content);
        setConvertedText(result);
        setDownloadName(file.name.replace(".json", ".ainoprj"));
      } else {
        alert("Please upload only .ainoprj or .json files");
      }
    };
    reader.readAsText(file);
  };

  // تنزيل الملف المحول
  const handleDownload = () => {
    const blob = new Blob([convertedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-center">AINOPRJ ↔ JSON Converter</h1>

      <input
        type="file"
        accept=".ainoprj,.json"
        onChange={handleFileUpload}
        className="w-full border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:border-blue-500 transition"
      />

      {convertedText && (
        <div className="space-y-4">
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Download {downloadName}
          </button>
          <pre className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-[400px] overflow-auto text-sm">
            {convertedText}
          </pre>
        </div>
      )}
    </div>
  );
}
