import {
	ActionFunction,
	Form,
	LoaderFunction,
	redirect,
	useActionData,
} from "remix";
// import { supabase } from "~/lib/supabase";
import { commitSession, getSession } from "~/lib/session.server";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	let email = formData.get("email") as string;
	let password = formData.get("password") as string;

	const supabase = createClient(
		"https://prmvfibheijucdazdfzc.supabase.co",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY4MzI1MCwiZXhwIjoxOTU5MjU5MjUwfQ.ElgtQJthx_B3DM_zIL2acASAo_J_F9HclpLDv1m_hQ0",
		{
			fetch: (...args) => fetch(...args),
		}
	);

	let session = await getSession();
	let auth = await supabase.auth.signIn({ email, password });

	if (!auth.user) {
		return {
			error: { message: "Senha ou usuário inválidos" },
		};
	}

	session.set("userId", auth.user.id);

	return redirect("/dashboard", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export const loader: LoaderFunction = async ({ request }) => {
	let session = await getSession(request.headers.get("Cookie"));
	if (session.has("userId")) return redirect("/dashboard");
	return "";
};

export default function () {
	let actionData = useActionData();
	let [passowrdVisible, showPassword] = useState(false);
	return (
		<div className="grid h-screen w-full place-content-center bg-gray-100">
			<div className="brick w-80 space-y-8">
				<div>
					<img src="/logo.svg" alt="STUDIO" className="w-32" />
				</div>
				{actionData?.error && (
					<div className="error-banner mt-8 flex items-center gap-4">
						<div>{actionData.error.message}</div>
					</div>
				)}

				<Form method="post">
					<label className="field">
						<span>Email</span>
						<div className="input">
							<input
								type="email"
								name="email"
								placeholder="Seu email"
							/>
						</div>
					</label>
					<label className="field">
						<span>Senha</span>
						<div className="input">
							<input
								type={passowrdVisible ? "text" : "password"}
								name="password"
								placeholder="Sua senha"
								className="rounded-r-none"
							/>
							<button
								type="button"
								className="button button-icon button-ghost w-14  flex-shrink-0 rounded-l-none rounded-r-xl"
								onClick={() => showPassword(!passowrdVisible)}
							>
								<HiOutlineLockClosed />
							</button>
						</div>
					</label>
					<div className="mt-6  flex justify-end">
						<button className="button button-primary" type="submit">
							Entrar
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
