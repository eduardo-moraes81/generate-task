import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [] // aqui ele está pegando as tarefas que está armazenada no LocalStorage que atualiza a tabela
  );

  useEffect(() => {
    // essa função cria um efeito quando algo muda, ou é atualizado ex: o efeito quando tasks for alterado, vai chamar "tasks foi alterado"
    localStorage.setItem("tasks", JSON.stringify(tasks)); // aqui ele pega as tarefas, passa pra JSON e transforma ela em string e armazena no localStorage
  }, [tasks]);

  //função para usar a API
  useEffect(() => {
    async function fetchTasks() {
      //chamar a API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10", // limit 10 so para pegar 10 tarefas, se nao ira lotar
        { method: "GET" }
      );
      //pegar os dados que ela retorna
      const data = await response.json();
      //armazenar/persistir esses dados no state
      setTasks(data);
    }
    fetchTasks();
  }, []);

  //essa função vai ser executada quando eu clicar na tarefa que ja foi realizada
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar está tarefa
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //não preciso ataualizar está tarefa

      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId); // aqui precisa deixar na lista todas as tarefas que estão nelas, menos a que eu cliquei para poder excluir // nessa lista vai ter todas as tarefas, com execessão da que eu cliquei
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), //v4 é da biblioteca uuid, para importar um ID aleatorio
      title,
      description,
      isCompleted: false, // aqui a tarefa precisa ser falso por padrão, pois estamos adicionando ela e ela nao vai estar completa
    };

    setTasks([...tasks, newTask]); //...tasks significa que vai ter todas as tarefas anteriores e o newTask é a que vai ser adicionada agora
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
