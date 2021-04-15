import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
export default function Sidebar({ links, currentRoute }) {
	return (
		<div class="p-sidebar">
			{links.map((link) => (
				<Link to={link.path}>
					<div
						className={
							currentRoute === link.path
								? "side-bar-elements active"
								: "side-bar-elements"
						}>
						{link.icon}
						<h6>{link.label}</h6>
					</div>
				</Link>
			))}
		</div>
	);
}
