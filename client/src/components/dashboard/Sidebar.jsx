import React from "react";
import { Link } from "react-router-dom";


export default function Sidebar({ links, currentRoute }) {
	return (
		
		<div className="navBar">
                <nav className="nav-menu">
                    <ul className="nav-menu-items">
						
							{links.map((item, index) => {
								return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
											<div
											className={
												currentRoute === item.path
													? "side-bar-elements active"
													: "side-bar-elements"
											}>
											{item.icon}
											<h6>{item.title}</h6>
											</div>
										</Link>
                                    </li>
                                )
						})}
                        
                    </ul>
                </nav>
        </div>
			
		
	);
}
