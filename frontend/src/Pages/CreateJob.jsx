import { useForm } from 'react-hook-form';

function CreateJob() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/jobs/create", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                const json = await response.json();
                console.log(json);
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <h1>Create Job</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("title")}
                    type="text"
                    placeholder="Title"
                >
                </input>
                <input
                    {...register("description")}
                    type="text"
                    placeholder="Description"
                >
                </input>
                <input
                    {...register("company")}
                    type="text"
                    placeholder="Company"
                >
                </input>
                <button type="submit">Submit</button>
            </form>
        </>
    )

}

export default CreateJob;