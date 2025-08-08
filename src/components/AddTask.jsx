import Input from "./Input";
import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescriptrion] = useState("");

  //SEMPRE QUE FOR USAR JAVASCRIPT DENTRO DO RETURN PRECISAR TER CHAVES {}

  return (
    // flex-col da div é para deixar um embaixo do outro, como se fosse colunas
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o titulo da tarefa"
        value={title} // o valor que o usuario digitou vai ser o valor do state (não entendi muito bem)
        onChange={(event) => setTitle(event.target.value)} // aqui ele atualizar o state conforme ele digita no INPUT
      />

      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        className="border border-slate-300 outline-slate-400 px-4 py-2"
        value={description}
        onChange={(event) => setDescriptrion(event.target.value)}
      />
      <button
        onClick={() => {
          //verificar se o titulo e a descrição estão preenchidos
          if (!title.trim() || !description.trim) {
            //o .trim serve para tirar os espaços em branco, no caso se tiver so "   " no input
            return alert("Preencha o titulo e a descrição da tarefa");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescriptrion("");
        }} // aqui ele passa o valor que veio dos state ao clicar no botao de adicionar e depois limpa as entradas
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
