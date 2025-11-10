import { useForm } from 'react-hook-form';

function Signup() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await fetch("http://localhost:5174/users/signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                const json = await response.json()
                console.log(json)
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email")}
                    type="text"
                    placeholder="Email"
                >
                </input>
                <input
                    {...register("password")}
                    type="text"
                    placeholder="Password"
                >
                </input>
                <button type="submit">Signup</button>
            </form>
        </>
    )

}

export default Signup;