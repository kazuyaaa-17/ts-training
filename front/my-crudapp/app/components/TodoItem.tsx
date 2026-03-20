import { todo } from "../types/todo";
type TodoItemProps = todo&{onRemove:(id:number)=>void, onToggle:(id:number)=>void};

export default function TodoItem(props:TodoItemProps){
    return (
        <li className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${props.done ? "bg-slate-800/40 border-slate-700/50" : "bg-slate-800 border-slate-700"}`}>
            <span
                onClick={()=>props.onToggle(props.id)}
                className={`text-sm cursor-pointer select-none transition-colors ${props.done ? "line-through text-slate-500" : "text-slate-100"}`}
            >
                {props.title}
            </span>
            <button
                onClick={()=>props.onRemove(props.id)}
                className="text-slate-600 hover:text-red-400 text-xs transition-colors ml-4"
            >
                削除
            </button>
        </li>
    );
}