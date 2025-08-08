function Button(props) {
  return (
    <button
      {...props}
      className="bg-slate-400 text-white px-4 py-2 rounded-md font-medium"
    >
      {props.children}
    </button> //props.children passa o que tem dentro da função Button que vai ser chamada
  );
}

export default Button;
