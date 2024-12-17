import { redirect } from "@sveltejs/kit";

export function load() {
    redirect(
        302,
        "https://docs.google.com/forms/d/e/1FAIpQLScyyLCcd9LJAo_x2Ly0jvNgAI6-dqp3AmKYoFbca5mxLVvtCQ/viewform",
    );
}
