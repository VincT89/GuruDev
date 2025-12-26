import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loginUser } from "../store/features/authSlice";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";

export default function Login() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		const result = await dispatch(loginUser({ email, password }));

		if (loginUser.fulfilled.match(result)) {
			toast.success("Accesso effettuato con successo!");
			navigate("/home");
		} else {
			toast.error(result.payload || "Errore durante l'accesso.");
		}
	}

	return (
		<div className="container max-w-md py-30">
			<h1 className="mb-6 text-center">Accedi</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
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

				<Button className="w-full">Accedi</Button>
			</form>

			<p className="mt-6 text-center text-sm text-gray-600">
				Non hai un account?{" "}
				<Link to="/register" className="text-black hover:underline">
					Inizia
				</Link>
			</p>
		</div>
	);
}
