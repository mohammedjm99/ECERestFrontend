import Topbar from "../../components/topbar/Topbar";

const Loading = ()=>{
    return(
        <div className="loading">
            <Topbar/>
            <div className="wrapper">
                Loading...
            </div>
        </div>
    )
}

export default Loading;