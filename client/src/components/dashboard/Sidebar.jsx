import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    hide: {
        display: 'none !important'
    },
});

function Sidebar({ links, currentRoute, history}) {
	const currentUser = JSON.parse(localStorage.getItem('user'));
	console.log("sidebar", history);



	// const navigateScreen = (path) =>{
	// 	history.push({pathname : path});
	// }

	return (
		
		<div className="navBar">
                <nav className="nav-menu">
                    <ul className="nav-menu-items">
						
							{links.map(({title, path, role, child, children, icon, cName},  index) => {
								let hide = role !== undefined && currentUser.role !== "Admin";
								let menuActive = false
								
								if (children) {
									if (currentRoute === path) {
										menuActive = true
									} else {
										children.forEach(path => {
											if (currentRoute.indexOf(path) !== -1) {
												menuActive = true
											}
										})
									}
								} else {
									if (currentRoute === path) {
										menuActive = true
									}
								}

								let classNames = [
									menuActive ? 'side-bar-elements menuActive' : 'side-bar-elements',  
									hide ? 'hide' : '',
								];
								classNames = classNames.join(' ');

								if(!child){
									return(
										<li key={index} className={cName}>
											<Link to={path}>
												<div
													className={classNames}>
													{icon}
													<h6>{title}</h6>
												</div>
											</Link>
										</li>
										
									)
								}
							})}
					
                        
                    </ul>
                </nav>
        </div>
			
		
	);
}
export default  withStyles(styles)(Sidebar)