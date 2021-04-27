import React from "react";
import SettingMenu from './SettingMenu';

export default function Navbar() {
	return (
		<header className="dashboard-navbar">
			<div className="user-avatar">
				<SettingMenu></SettingMenu>
			</div>
		</header>
	);
}
