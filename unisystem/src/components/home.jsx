import { Link } from "react-router-dom"
function Home(){
    return(
        <div>
            <ul className="flex flex-col gap-y-2 sm:gap-y-4">
                <li><Link className="text-blue-500" to={"/degrees"}><button className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 w-[60%] hover:bg-zinc-300">Go to degrees</button></Link></li>
                <li><Link className="text-blue-500" to={"/cohorts"}><button className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 w-[60%] hover:bg-zinc-300">Go to cohorts</button></Link></li>
                <li><Link className="text-blue-500" to={"/modules"}><button className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 w-[60%] hover:bg-zinc-300">Go to modules</button></Link></li>
            </ul>
        </div>
    )
}

export default Home