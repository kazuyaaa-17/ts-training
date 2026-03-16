import { todo } from "../types/todo";
type TodoItemProps = todo&{onRemove:(id:number)=>void, onToggle:(id:number)=>void};

export default function TodoItem(props:TodoItemProps){
    return (
        <li className={`flex items-center justify-between px-4 py-3 rounded-xl border shadow-sm transition-colors ${props.done ? "bg-indigo-50 border-indigo-100" : "bg-white border-indigo-200"}`}>
            <span
                onClick={()=>props.onToggle(props.id)}
                className={`text-sm cursor-pointer select-none ${props.done ? "line-through text-indigo-300" : "text-zinc-700"}`}
            >
                {props.title}
            </span>
            <button
                onClick={()=>props.onRemove(props.id)}
                className="text-indigo-300 hover:text-red-400 text-xs transition-colors ml-4"
            >
                削除
            </button>
        </li>
    );
}