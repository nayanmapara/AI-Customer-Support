"use client";

import { useState, useEffect } from "react";
import Chat from "@/components/Chat";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Home() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark";
		if (savedTheme) {
			setTheme(savedTheme);
			document.body.classList.add(savedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.body.classList.remove(theme);
		document.body.classList.add(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<div className="flex flex-col h-screen">
			<div className="flex justify-end p-4">
				<IconButton
					onClick={toggleTheme}
					color="primary"
					sx={{
						color: theme === "light" ? "#FFA500" : "#FFFFFF",
					}}
				>
					{theme === "light" ? <DarkMode /> : <LightMode />}
				</IconButton>
			</div>
			<Chat theme={theme} toggleTheme={toggleTheme} />
		</div>
	);
}
