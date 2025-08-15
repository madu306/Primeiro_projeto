import { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Adiciona a mensagem do usuário na tela
    setMessages([...messages, { sender: "user", text: input }]);

    // Monta o payload para o Ollama
    const payload = {
      input_value: input,
      output_type: "chat",
      input_type: "chat",
      session_id: "user_1" // ou algo dinâmico por usuário
    };

    try {
      const res = await fetch(
        "http://127.0.0.1:7860/api/v1/run/211fb1de-9f5a-4f0a-bec5-c344631e22d5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      // Adiciona a resposta da IA na tela
      setMessages(prev => [...prev, { sender: "ai", text: data.output_value || "Sem resposta" }]);
      setInput("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={m.sender}>
            {m.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default Chat;

