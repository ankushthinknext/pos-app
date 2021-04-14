import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
export default function Sidebar() {
	return (
		<div class="p-sidebar">
			<Link>
				<div className="side-bar-elements">
					<HomeIcon />
					<h6>Dashboard</h6>
				</div>
			</Link>
			<Link>
				<div className="side-bar-elements">
					<HomeIcon />
					<h6>Dashboard</h6>
				</div>
			</Link>
			<Link>
				<div className="side-bar-elements">
					<HomeIcon />
					<h6>Dashboard</h6>
				</div>
			</Link>
		</div>
	);
}
