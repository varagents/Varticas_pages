export default function AboutInfo() {
    return (
        <section className="py-20 px-4 bg-[#07080A] border-y border-white/5 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">About Varticas</h2>
                <div className="space-y-6 text-xl text-gray-400 font-light leading-relaxed">
                    <p>
                        Varticas is an AI productivity platform that integrates with Google services such as Gmail, Google Calendar, and Google Drive. The platform allows users to automate tasks like sending emails, scheduling meetings, and organizing documents using natural language commands through an AI assistant.
                    </p>
                    <p>
                        Varticas only accesses Google user data after explicit user authorization via Google OAuth and uses the data strictly to perform user-requested actions.
                    </p>
                </div>
            </div>
        </section>
    );
}
