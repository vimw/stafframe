import Link from "next/link";

export default function page(){
    return (
        <div className="main">
            <div className="header">
                <h2>Manage Tasks</h2>
                <Link href="tasks/create"><span>+</span> Create</Link>
            </div>
            <div className="tasks">

            </div>
        </div>
    );
}