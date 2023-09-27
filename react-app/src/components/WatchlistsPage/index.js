import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import './WatchlistsPage.css'
import { getUserWatchlists } from "../../store/watchlists";
import WatchlistContent from "../WatchlistsContent";
import OpenModalButton from "../OpenModalButton";
import CreateNewWatchlist from "../NewWatchlistModal";

// const sample = [{x: 'pistachio', y: "is a nut", id: 1},{x: 'strawberry', y:"is a fruit", id: 2}]


const WatchlistsPage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const watchlists = useSelector((state) => state.watchlists.userWatchlists)

    useEffect(() => {
        if(sessionUser)dispatch(getUserWatchlists())
    },[dispatch, sessionUser])
    console.log(sessionUser)
    console.log(watchlists)



    const [toggleState, setToggleState] =useState(1)
    const sample = [{x: 'pistachio', y: "is a nut", id: 1},{x: 'strawberry', y:"is a fruit", id: 2}]
    const toggleTab = (index) => {
        setToggleState(index)
    }
    useEffect(() => {
        if (watchlists.length){
            setToggleState(watchlists[0].id)
        }
    }, [watchlists, setToggleState])






    return(
        <>
        {(sessionUser && watchlists)
        ? <div>

            <div className='WatchlistContainer'>

             <div className="wlTopBar">
                <div className="wltbTabs">
                    {watchlists ? (
                        watchlists.map((el) => (
                            <div
                            className={toggleState === el.id ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(el.id)}
                            >{el.name}</div>
                        ))
                    ): <div>...loading</div>}
                </div>
                <div className="wltbAddList">
                    <div className='addWatchlist'>
                    <OpenModalButton
                     buttonText={"+"}
                     modalComponent={<CreateNewWatchlist />}
                    />
                    </div>
                </div>


             </div>
             <div className="wlContent">
                {watchlists ? (
                 watchlists.map((el) => (
                     <div
                     className={toggleState === el.id ? "content active-content" : "content"}
                     >
                        <WatchlistContent stocks={el.stocks} name={el.name} id={el.id}  />
                     </div>
                 ))
                ): <div>...loading</div>}
             </div>
         </div>


        </div> : <div>....loadin mane</div>}
        </>




        // <div className='WatchlistContainer'>
        //     <div className='addWatchlist'>
        //         <button
        //         onClick={() => {return(alert("Feature Coming Soon!"))}}
        //         >Create new Watchlist</button>
        //     </div>
        //     <div className="wlTopBar">
        //         {sample ? (
        //             sample.map((el) => (
        //                 <div
        //                 className={toggleState === el.id ? "tabs active-tabs" : "tabs"}
        //                 onClick={() => toggleTab(el.id)}
        //                 >{el.x}</div>
        //             ))
        //         ): <div>...loading</div>}
        //     </div>
        //     <div className="wlContent">
        //        {sample ? (
        //         sample.map((el) => (
        //             <div
        //             className={toggleState === el.id ? "content active-content" : "content"}
        //             >{el.y} </div>
        //         ))
        //        ): <div>...loading</div>}
        //     </div>
        // </div>
    )
}

export default WatchlistsPage