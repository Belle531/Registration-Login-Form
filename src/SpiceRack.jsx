
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";

const API_URL = "https://your-api-id.execute-api.region.amazonaws.com/prod/recipes"; // Replace with your actual API endpoint

const SpiceRack = ({ onGoToDashboard, onGoToRegister, handleLogout }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Fetch all recipes on initial load
	useEffect(() => {
		const fetchRecipes = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await axios.get(API_URL);
				setResults(response.data);
			} catch {
				setError("Failed to fetch recipes.");
			} finally {
				setLoading(false);
			}
		};
		fetchRecipes();
	}, []);

	// Search recipes via API
	const handleSearch = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.get(API_URL, {
				params: { q: searchTerm }
			});
			setResults(response.data);
		} catch {
			setError("Search failed.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 font-inter">
				<header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0 z-10">
				<div className="flex items-center w-full gap-4">
						<div className="w-full flex justify-start items-center pl-64">
						<h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-wider text-center mx-auto w-full">
							Cassandra's Digital Solutions
						</h1>
					</div>
					
					<nav className="flex space-x-2 text-xs sm:text-sm">
						<button onClick={onGoToDashboard} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Dashboard</button>
						<button onClick={handleLogout} className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">Logout</button>
						<button onClick={onGoToRegister} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
					</nav>
				</div>
			</header>

			
			<main className="flex-grow flex flex-col items-center p-4 pt-24 pb-20 justify-center">
				
				<div className="w-full flex flex-col items-center">
					
					<div className="mt-8 mb-2 flex flex-col items-center justify-center">
						<div className="relative inline-block">
							<div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
								<span className="text-white font-bold text-4xl tracking-wider">CDS</span>
							</div>
							<div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
						</div>
					</div>
					
					<div className="w-full max-w-md mb-8 flex flex-col items-center">
						<div className="relative w-full">
							<input
								type="text"
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								placeholder="Search recipes..."
								className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500 shadow"
							/>
							<button
								type="button"
								onClick={handleSearch}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 focus:outline-none"
							>
								<Search className="w-6 h-6" />
							</button>
						</div>
					</div>
					
					<div className="w-full max-w-4xl mx-auto">
						{loading && <p className="text-center text-gray-500 mt-4">Loading recipes...</p>}
						{error && <p className="text-center text-red-500 mt-4">{error}</p>}
						{!loading && results.length === 0 && !error ? (
							<p className="text-center text-gray-500 mt-4">No recipes found.</p>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
								{results.map(recipe => (
									<button
										key={recipe.id}
										className="bg-white rounded-xl shadow p-4 border border-gray-200 flex flex-col items-center hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none"
										onClick={() => alert('Recipe coming soon!')}
									>
										
										<div className="w-32 h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
											<span className="text-gray-400 text-sm">Image</span>
										</div>
										<h3 className="text-lg font-bold text-slate-800 mb-1 text-center">{recipe.name}</h3>
										<p className="text-sm text-gray-600 text-center">{recipe.description}</p>
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</main>


			<footer className="w-full bg-slate-800 p-4 shadow-xl mt-auto">
				<p className="text-gray-300 text-center text-sm font-medium font-sans">&copy; 2025 Cassandra's Digital Solutions. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default SpiceRack;
