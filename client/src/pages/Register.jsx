import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { registerUser } from "../store/features/authSlice.js";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import toast from "react-hot-toast";
import PasswordInput from "../components/ui/PasswordInput.jsx";

export default function Register() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		const result = await dispatch(registerUser({ username, email, password }));

		if (registerUser.fulfilled.match(result)) {
			toast.success("Registrazione avvenuta con successo!");
			navigate("/");
		} else {
			toast.error(result.payload || "Errore durante la registrazione.");
		}
	}

	return (
		<div className="container max-w-md py-30">
			<h1 className="mb-6 text-center">Inizia</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
				<Input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<PasswordInput
					password={password}
					setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>

				<Button className="w-full">Crea account</Button>
			</form>

			<p className="mt-6 text-center text-sm text-gray-600">
				Hai già un account?{" "}
				<Link to="/login" className="text-black hover:underline">
					Accedi
				</Link>
			</p>
		</div>
	);
}
