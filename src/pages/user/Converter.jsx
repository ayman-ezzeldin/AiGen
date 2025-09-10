import { useState } from "react";

export default function Converter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Helper: تحويل .ainoprj إلى JSON
  const ainoprjToJSON = (text) => {
    const nodes = [];
    const nodeBlocks = text.split("NODE_START").slice(1); // تجاهل الجزء قبل أول Node
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
    return nodes;
  };

  // Example usage
  const handleConvertToJSON = () => {
    const result = ainoprjToJSON(inputText);
    setOutputText(JSON.stringify(result, null, 2));
  };

  return (
    <div className="p-4">
      <textarea
        rows={10}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder=".ainoprj or JSON input"
        className="w-full border p-2"
      />
      <button
        onClick={handleConvertToJSON}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Convert to JSON
      </button>
      <textarea
        rows={10}
        value={outputText}
        readOnly
        className="w-full border p-2 mt-2"
      />
    </div>
  );
}
