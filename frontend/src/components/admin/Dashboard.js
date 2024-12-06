import SideBar from "./SideBar";

export default function Dashboard(){
    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <SideBar/>
            </div>
            <div className="col-12 col-md-10">
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}