import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [inputTypePassword] = useState("password");
  const [inputTypeText] = useState("text");
  const [curentInputType, setCurrentInputType] = useState(inputTypePassword);
  const [hashedValue, setHashedValue] = useState("");

  async function hash(rawInput: string) {
    if (!rawInput) setHashedValue("");
    else setHashedValue(await invoke("hash_with_sha512", { rawInput }));
  }

  async function copyToClipboard(rawInput: string) {
    await invoke("copy_to_clipboard", { rawInput });
  }

  async function copyToClipboardFirstXCharacters(numberOfCharactersToBeCopied: number, rawInput: string) {
    await copyToClipboard(rawInput.substring(0, numberOfCharactersToBeCopied));
  }


  return (
    <div className="container">
      <p>Hash with SHA-512</p>
      <div>
        <div className="row">
          <div>
            <div className="row">
              <input
                onChange={(e) => hash(e.currentTarget.value)}
                placeholder="Input"
                type={curentInputType}
              />
            </div>

            <div className="row" style={{ marginTop: "10px" }} >
              <input
                onChange={() => { }}
                placeholder="Output"
                value={hashedValue}
                type={curentInputType}
              />
              <button style={{ marginLeft: "10px" }} onClick={() => setCurrentInputType(curentInputType === inputTypePassword ? inputTypeText : inputTypePassword)}>show/hide 👀</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: "10px" }}>
        <button onClick={() => copyToClipboard(hashedValue)}>📃 Copy all</button>
        <button onClick={() => copyToClipboardFirstXCharacters(110, hashedValue)}>📃 Copy fist 110 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(100, hashedValue)}>📃 Copy fist 100 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(80, hashedValue)}>📃 Copy fist 80 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(60, hashedValue)}>📃 Copy fist 60 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(40, hashedValue)}>📃 Copy fist 40 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(20, hashedValue)}>📃 Copy fist 20 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(10, hashedValue)}>📃 Copy fist 10 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(8, hashedValue)}>📃 Copy fist 8 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(6, hashedValue)}>📃 Copy fist 6 characteres</button>
        <button onClick={() => copyToClipboardFirstXCharacters(4, hashedValue)}>📃 Copy fist 4 characteres</button>
      </div>
    </div>
  );
}

export default App;
