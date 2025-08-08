import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(tasks) {
    const query = new URLSearchParams(); // aqui é uma questao de boa pratica, pois ele faz o tratamento necessario da string para nao ter nenhum conflito quando passar no serachparams
    query.set("title", tasks.title); // sempre importante usar queryparams em react, pesquisar mais a sobre quando for estudar
    query.set("description", tasks.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map(
        (
          task //map é como se fosse um for, ele vai renderizar todos os paragrafos das tasks solicitados, ex: tittle, id, description
        ) => (
          <li key={task.id} className="flex gap-2">
            <button
              onClick={() => onTaskClick(task.id)}
              className={`bg-slate-400 text-left w-full flex items-center gap-2 text-white p-2 rounded-md ${
                task.isCompleted && "line-through"
              }`}
            >
              {task.title}
            </button>
            <Button
              onClick={() => onSeeDetailsClick(task)}
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              <ChevronRightIcon />
            </Button>
            <button
              onClick={() => onDeleteTaskClick(task.id)} // quando ele clica nesse botão ele chama a função passando o ID da task que ele quer remover
              className="bg-slate-400 p-2 rounded-md text-white"
            >
              <TrashIcon />
            </button>
          </li>
        )
      )}
    </ul>
  );
}

export default Tasks;
